import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame, Leaf, Plus, Check, Search } from "lucide-react";
import { categories, menuItems } from "../data/menu";
import { useCart } from "../context/CartContext";

const pageCategories = categories.filter((c) => c.id !== "all");

export function MenuBook() {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [query, setQuery] = useState("");
  const { addItem, lastAddedId } = useCart();

  const activeCategory = pageCategories[pageIndex];

  const pageItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = item.category === activeCategory.id;
      const matchesQuery =
        query.trim() === "" ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const goTo = (next: number) => {
    if (next < 0 || next >= pageCategories.length) return;
    setDirection(next > pageIndex ? 1 : -1);
    setPageIndex(next);
  };

  const variants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      transformOrigin: dir > 0 ? "left center" : "right center",
    }),
    center: { rotateY: 0, opacity: 1, transformOrigin: "center center" },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      transformOrigin: dir > 0 ? "left center" : "right center",
    }),
  };

  return (
    <section className="min-h-[100svh] flex flex-col items-center justify-center py-28 px-4 bg-noise">
      <div className="text-center mb-8">
        <p className="text-ember font-semibold mb-1 uppercase tracking-widest text-xs sm:text-sm">
          Notre carte
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Le menu <span className="text-gradient">BlazeBite</span>
        </h2>
      </div>

      <div className="relative flex items-center gap-3 sm:gap-6 w-full max-w-xl justify-center">
        <button
          onClick={() => goTo(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="glass rounded-full p-3 disabled:opacity-30 hover:bg-white/10 transition-colors shrink-0"
          aria-label="Page précédente"
        >
          <ChevronLeft size={20} />
        </button>

        <div style={{ perspective: 1800 }} className="relative w-full max-w-[420px] aspect-[148/210]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeCategory.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="absolute inset-0 rounded-2xl bg-cream text-bg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col"
            >
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-bg/10" />

              <div className="px-6 sm:px-8 pt-7 pb-4 border-b border-bg/10 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-ember font-semibold">
                    Page {pageIndex + 1} / {pageCategories.length}
                  </p>
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <span>{activeCategory.emoji}</span> {activeCategory.label}
                  </h3>
                </div>
              </div>

              <div className="px-6 sm:px-8 pt-4">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-bg/40" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher dans la carte..."
                    className="w-full bg-bg/5 rounded-full pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ember/50 placeholder:text-bg/40"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4 space-y-4">
                {pageItems.length === 0 ? (
                  <p className="text-bg/50 text-sm text-center pt-10">
                    Aucun plat ne correspond à ta recherche sur cette page.
                  </p>
                ) : (
                  pageItems.map((item) => (
                    <div key={item.id} className="group">
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold flex items-center gap-1.5">
                          {item.name}
                          {item.spicy && <Flame size={12} className="text-ember" />}
                          {item.vegetarian && <Leaf size={12} className="text-green-600" />}
                        </span>
                        <span className="flex-1 border-b border-dotted border-bg/30 translate-y-[-3px]" />
                        <span className="font-bold text-ember whitespace-nowrap">
                          {item.price.toFixed(2)}€
                        </span>
                      </div>
                      <p className="text-xs text-bg/60 mt-0.5 pr-4">{item.description}</p>
                      <motion.button
                        onClick={() => addItem(item)}
                        whileTap={{ scale: 0.94 }}
                        className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-bg/70 bg-bg/5 hover:bg-gradient-to-r hover:from-ember hover:to-gold hover:text-bg rounded-full px-3 py-1.5 transition-colors"
                      >
                        {lastAddedId === item.id ? (
                          <>
                            <Check size={13} /> Ajouté !
                          </>
                        ) : (
                          <>
                            <Plus size={13} /> Ajouter
                          </>
                        )}
                      </motion.button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => goTo(pageIndex + 1)}
          disabled={pageIndex === pageCategories.length - 1}
          className="glass rounded-full p-3 disabled:opacity-30 hover:bg-white/10 transition-colors shrink-0"
          aria-label="Page suivante"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-6">
        {pageCategories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => goTo(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === pageIndex ? "w-6 bg-gradient-to-r from-ember to-gold" : "w-2 bg-cream/20"
            }`}
            aria-label={`Aller à la page ${cat.label}`}
          />
        ))}
      </div>
    </section>
  );
}
