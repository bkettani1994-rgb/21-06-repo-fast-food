/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, CheckCircle2, ChefHat, Truck, PartyPopper } from "lucide-react";
import type { AppNotification } from "../types";

interface NotificationContextValue {
  notify: (title: string, message: string, icon?: NotifKind) => void;
}

type NotifKind = "bell" | "check" | "chef" | "truck" | "party";

const icons: Record<NotifKind, typeof Bell> = {
  bell: Bell,
  check: CheckCircle2,
  chef: ChefHat,
  truck: Truck,
  party: PartyPopper,
};

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<(AppNotification & { kind: NotifKind })[]>([]);

  const notify = useCallback((title: string, message: string, icon: NotifKind = "bell") => {
    const id = `${Date.now()}-${Math.random()}`;
    setItems((prev) => [...prev, { id, title, message, createdAt: Date.now(), kind: icon }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((n) => n.id !== id));
    }, 4500);
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-[calc(100%-2rem)] sm:w-96 pointer-events-none">
        <AnimatePresence>
          {items.map((n) => {
            const Icon = icons[n.kind];
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: 80, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="glass-strong rounded-2xl p-4 shadow-2xl pointer-events-auto flex items-start gap-3 border-l-4 border-l-ember"
              >
                <div className="bg-gradient-to-br from-ember to-gold rounded-full p-2 shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-cream text-sm">{n.title}</p>
                  <p className="text-xs text-cream/70 mt-0.5">{n.message}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
