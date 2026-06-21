import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { categories } from "../data/menu";
import type { Category } from "../types";

export function MenuFilterBar({
  query,
  onQuery,
  activeCategory,
  onCategory,
}: {
  query: string;
  onQuery: (v: string) => void;
  activeCategory: Category | "all";
  onCategory: (c: Category | "all") => void;
}) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Rechercher un plat..."
          className="w-full glass-strong rounded-full pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-ember/60 transition-shadow placeholder:text-cream/40"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategory(cat.id)}
            className={`relative whitespace-nowrap rounded-full px-4 py-3 text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeCategory === cat.id ? "text-bg" : "glass text-cream/70 hover:text-cream"
            }`}
          >
            {activeCategory === cat.id && (
              <motion.span
                layoutId="filter-pill"
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
  );
}
