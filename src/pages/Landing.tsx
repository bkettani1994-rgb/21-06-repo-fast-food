import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Menu } from "../components/Menu";
import { Features } from "../components/Features";
import { OrderTracking } from "../components/OrderTracking";
import { Footer } from "../components/Footer";
import { CartButton, CartDrawer } from "../components/CartDrawer";
import { Checkout } from "../components/Checkout";

export function Landing() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { close } = useCart();

  return (
    <div className="bg-bg min-h-screen">
      <Navbar />
      <Hero />
      <Menu />
      <Features />
      <OrderTracking />
      <Footer />

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
