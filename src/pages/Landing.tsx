import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { Navbar } from "../components/Navbar";
import { MenuBook } from "../components/MenuBook";
import { OrderTracking } from "../components/OrderTracking";
import { CartButton, CartDrawer } from "../components/CartDrawer";
import { Checkout } from "../components/Checkout";

export function Landing() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { close } = useCart();
  const { orders } = useOrders();

  return (
    <div className="bg-bg min-h-screen">
      <Navbar />
      <MenuBook />

      {orders.length > 0 && <OrderTracking />}

      <CartButton />
      <CartDrawer
        onCheckout={() => {
          close();
          setCheckoutOpen(true);
        }}
      />
      <Checkout
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  );
}
