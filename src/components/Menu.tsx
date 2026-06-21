import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Flame, Leaf, Plus, Check } from "lucide-react";
import { categories, menuItems } from "../data/menu";
import type { Category } from "../types";
import { useCart } from "../context/CartContext";

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const { addItem, lastAddedId } = useCart();

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
    <section id="menu" className="relative py-24 px-6 lg:px-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-ember font-semibold mb-2 uppercase tracking-widest text-sm">Notre carte</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Choisis ton <span className="text-gradient">festin</span>
        </h2>
        <p className="text-cream/60 max-w-xl mx-auto">
          Des recettes signature préparées avec des produits frais, sélectionnées chaque jour.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-10 sticky top-4 z-30">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un burger, un tacos..."
            className="w-full glass-strong rounded-full pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-ember/60 transition-shadow placeholder:text-cream/40"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative whitespace-nowrap rounded-full px-4 py-3 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "text-bg"
                  : "glass text-cream/70 hover:text-cream"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-ember to-gold -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.popular && (
                    <span className="bg-gradient-to-r from-ember to-gold text-bg text-xs font-bold px-2.5 py-1 rounded-full">
                      Populaire
                    </span>
                  )}
                  {item.spicy && (
                    <span className="bg-bg/70 backdrop-blur p-1.5 rounded-full">
                      <Flame size={14} className="text-ember" />
                    </span>
                  )}
                  {item.vegetarian && (
                    <span className="bg-bg/70 backdrop-blur p-1.5 rounded-full">
                      <Leaf size={14} className="text-green-400" />
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
                  <span className="text-gold font-bold whitespace-nowrap">{item.price.toFixed(2)}€</span>
                </div>
                <p className="text-sm text-cream/60 flex-1">{item.description}</p>

                <motion.button
                  onClick={() => addItem(item)}
                  whileTap={{ scale: 0.92 }}
                  className="mt-4 relative w-full flex items-center justify-center gap-2 rounded-full py-2.5 font-semibold bg-cream/10 hover:bg-gradient-to-r hover:from-ember hover:to-gold hover:text-bg transition-colors duration-300 overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {lastAddedId === item.id ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={16} /> Ajouté !
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2"
                      >
                        <Plus size={16} /> Ajouter au panier
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-cream/50 py-16"
        >
          Aucun plat ne correspond à ta recherche. Essaie un autre mot-clé 🔍
        </motion.p>
      )}
    </section>
  );
}
