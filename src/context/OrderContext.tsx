/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { CartLine, Order, OrderStatus } from "../types";
import { useNotifications } from "./NotificationContext";

interface OrderContextValue {
  orders: Order[];
  placeOrder: (lines: CartLine[], total: number, customerName: string, address: string) => Order;
  updateStatus: (orderId: string, status: OrderStatus) => void;
  getOrder: (orderId: string) => Order | undefined;
}

export const STATUS_FLOW: OrderStatus[] = [
  "received",
  "preparing",
  "cooking",
  "delivering",
  "delivered",
];

export const STATUS_LABELS: Record<OrderStatus, string> = {
  received: "Commande reçue",
  preparing: "Préparation",
  cooking: "En cuisson",
  delivering: "En livraison",
  delivered: "Livrée",
};

const OrderContext = createContext<OrderContextValue | null>(null);

let orderCounter = 1042;

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { notify } = useNotifications();
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>[]>>({});

  const placeOrder = useCallback(
    (lines: CartLine[], total: number, customerName: string, address: string) => {
      const id = `#${orderCounter++}`;
      const order: Order = {
        id,
        lines,
        total,
        status: "received",
        customerName,
        address,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setOrders((prev) => [order, ...prev]);
      notify("Commande envoyée 🎉", `Votre commande ${id} a été reçue par le restaurant.`, "check");

      const delays = [4000, 9000, 14000, 19000];
      const statusesAfter: OrderStatus[] = ["preparing", "cooking", "delivering", "delivered"];
      timers.current[id] = delays.map((delay, idx) =>
        setTimeout(() => {
          setOrders((prev) =>
            prev.map((o) =>
              o.id === id ? { ...o, status: statusesAfter[idx], updatedAt: Date.now() } : o
            )
          );
        }, delay)
      );

      return order;
    },
    [notify]
  );

  const updateStatus = useCallback(
    (orderId: string, status: OrderStatus) => {
      timers.current[orderId]?.forEach(clearTimeout);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status, updatedAt: Date.now() } : o))
      );
    },
    []
  );

  const getOrder = useCallback((orderId: string) => orders.find((o) => o.id === orderId), [orders]);

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((arr) => arr.forEach(clearTimeout));
    };
  }, []);

  const prevStatuses = useRef<Record<string, OrderStatus>>({});
  useEffect(() => {
    orders.forEach((o) => {
      const prev = prevStatuses.current[o.id];
      if (prev && prev !== o.status) {
        const messages: Record<OrderStatus, string> = {
          received: "Votre commande a été reçue.",
          preparing: "Le restaurant prépare votre commande.",
          cooking: "Votre commande est en cours de cuisson !",
          delivering: "Votre livreur est en route 🛵",
          delivered: "Votre commande a été livrée. Bon appétit !",
        };
        notify(`Commande ${o.id} mise à jour`, messages[o.status], o.status === "delivered" ? "party" : o.status === "delivering" ? "truck" : "chef");
      }
      prevStatuses.current[o.id] = o.status;
    });
  }, [orders, notify]);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateStatus, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
