import { useMemo, useState } from "react";
import { motion, useMotionValue, useTransform, animate as animateValue } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame, Leaf, Plus, Check, Search, Zap } from "lucide-react";
import { categories, menuItems } from "../data/menu";
import type { Category } from "../types";
import { useCart } from "../context/CartContext";

const pageCategories = categories.filter(
  (c): c is { id: Category; label: string; emoji: string } => c.id !== "all"
);

function PageFace({
  categoryId,
  pageNumber,
  query,
  onQuery,
}: {
  categoryId: Category;
  pageNumber: number;
  query: string;
  onQuery: (v: string) => void;
}) {
  const { addItem, lastAddedId } = useCart();
  const category = pageCategories.find((c) => c.id === categoryId)!;

  const items = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = item.category === categoryId;
      const matchesQuery =
        query.trim() === "" ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [categoryId, query]);

  return (
    <div className="absolute inset-0 rounded-2xl bg-cream text-bg flex flex-col">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-bg/10" />

      <div className="px-6 sm:px-8 pt-7 pb-4 border-b border-bg/10">
        <p className="text-xs uppercase tracking-widest text-ember font-semibold">
          Page {pageNumber} / {pageCategories.length}
        </p>
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <span>{category.emoji}</span> {category.label}
        </h3>
      </div>

      <div className="px-6 sm:px-8 pt-4">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-bg/40" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Rechercher dans la carte..."
            className="w-full bg-bg/5 rounded-full pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ember/50 placeholder:text-bg/40"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4 space-y-4">
        {items.length === 0 ? (
          <p className="text-bg/50 text-sm text-center pt-10">
            Aucun plat ne correspond à ta recherche sur cette page.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="group">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold flex items-center gap-1.5">
                  {item.name}
                  {item.spicy && <Flame size={12} className="text-ember" />}
                  {item.vegetarian && <Leaf size={12} className="text-green-600" />}
                </span>
                <span className="flex-1 border-b border-dotted border-bg/30 translate-y-[-3px]" />
                <span className="font-bold text-ember whitespace-nowrap">{item.price.toFixed(2)}€</span>
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
    </div>
  );
}

export function MenuBook() {
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [flipping, setFlipping] = useState(false);
  const [query, setQuery] = useState("");

  const rotateY = useMotionValue(0);
  const flipProgress = useTransform(rotateY, (v) => Math.sin((Math.abs(v) / 180) * Math.PI));
  const glowOpacity = useTransform(flipProgress, [0, 0.5, 1], [0, 1, 0.25]);
  const shadowOpacity = useTransform(flipProgress, [0, 1], [0.12, 0.55]);
  const liftScale = useTransform(flipProgress, [0, 1], [1, 1.035]);
  const sweepLeft = useTransform(
    rotateY,
    direction > 0 ? [0, -180] : [0, 180],
    ["-20%", "120%"]
  );

  const goTo = (next: number) => {
    if (flipping || next < 0 || next >= pageCategories.length || next === displayedIndex) return;
    const dir = next > displayedIndex ? 1 : -1;
    setDirection(dir);
    setPendingIndex(next);
    setFlipping(true);
    rotateY.set(0);
    animateValue(rotateY, dir > 0 ? -180 : 180, {
      duration: 0.85,
      ease: [0.45, 0.05, 0.15, 1],
      onComplete: () => {
        setDisplayedIndex(next);
        setFlipping(false);
        setPendingIndex(null);
        rotateY.set(0);
      },
    });
  };

  const visibleIndex = flipping && pendingIndex !== null ? pendingIndex : displayedIndex;
  const activeCategory = pageCategories[displayedIndex];

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
          onClick={() => goTo(displayedIndex - 1)}
          disabled={displayedIndex === 0 || flipping}
          className="glass rounded-full p-3 disabled:opacity-30 hover:bg-white/10 transition-colors shrink-0"
          aria-label="Page précédente"
        >
          <ChevronLeft size={20} />
        </button>

        <div style={{ perspective: 2200 }} className="relative w-full max-w-[420px] aspect-[148/210]">
          {/* Ambient futuristic glow under the book, intensifies mid-flip */}
          <motion.div
            style={{ opacity: flipping ? shadowOpacity : 0.12 }}
            className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-ember/50 via-flame/30 to-gold/50 blur-2xl -z-10"
          />

          {/* Bottom layer: the page being revealed (or static page when idle) */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <PageFace
              categoryId={pageCategories[visibleIndex].id}
              pageNumber={visibleIndex + 1}
              query={query}
              onQuery={setQuery}
            />
          </div>

          {flipping && pendingIndex !== null && (
            <motion.div
              className="absolute inset-0"
              style={{
                rotateY,
                scale: liftScale,
                transformStyle: "preserve-3d",
                transformOrigin: direction > 0 ? "left center" : "right center",
              }}
            >
              {/* Front face: the page currently flipping away, shows old content */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
                style={{ backfaceVisibility: "hidden" }}
              >
                <PageFace
                  categoryId={pageCategories[displayedIndex].id}
                  pageNumber={displayedIndex + 1}
                  query={query}
                  onQuery={setQuery}
                />
                {/* Holographic light sweep */}
                <motion.div
                  style={{ left: sweepLeft, opacity: glowOpacity }}
                  className="absolute top-0 bottom-0 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/60 to-transparent blur-md mix-blend-screen pointer-events-none"
                />
                {/* Neon fold-edge accent */}
                <motion.div
                  style={{ opacity: glowOpacity }}
                  className={`absolute top-0 bottom-0 w-1 ${
                    direction > 0 ? "right-0" : "left-0"
                  } bg-gradient-to-b from-ember via-gold to-ember blur-[2px]`}
                />
              </div>

              {/* Back face: blank parchment, visible once the page has turned past 90° */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-cream/95 to-cream/80 flex items-center justify-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <Zap size={64} className="text-bg/10" />
              </div>
            </motion.div>
          )}
        </div>

        <button
          onClick={() => goTo(displayedIndex + 1)}
          disabled={displayedIndex === pageCategories.length - 1 || flipping}
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
              idx === displayedIndex ? "w-6 bg-gradient-to-r from-ember to-gold" : "w-2 bg-cream/20"
            }`}
            aria-label={`Aller à la page ${cat.label}`}
          />
        ))}
      </div>

      <p className="sr-only">{activeCategory.label}</p>
    </section>
  );
}
