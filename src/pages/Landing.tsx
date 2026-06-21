import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { Navbar } from "../components/Navbar";
import { MenuFilterBar } from "../components/MenuFilterBar";
import { MenuStack } from "../components/MenuStack";
import { OrderTracking } from "../components/OrderTracking";
import { CartButton, CartDrawer } from "../components/CartDrawer";
import { Checkout } from "../components/Checkout";
import { menuItems } from "../data/menu";
import type { Category } from "../types";

export function Landing() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { close } = useCart();
  const { orders } = useOrders();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="bg-bg min-h-screen">
      <Navbar />
      <MenuFilterBar
        query={query}
        onQuery={setQuery}
        activeCategory={activeCategory}
        onCategory={setActiveCategory}
      />

      {filtered.length > 0 ? (
        <MenuStack items={filtered} />
      ) : (
        <div className="h-screen flex items-center justify-center text-center text-cream/50 px-6">
          Aucun plat ne correspond à ta recherche. Essaie un autre mot-clé 🔍
        </div>
      )}

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
