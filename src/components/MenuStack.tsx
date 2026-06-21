import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Flame, Leaf, Plus, Check } from "lucide-react";
import type { MenuItem } from "../types";
import { useCart } from "../context/CartContext";

function StackCard({
  item,
  index,
  total,
  progress,
}: {
  item: MenuItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const { addItem, lastAddedId } = useCart();

  const prevStart = (index - 1) / total;
  const start = index / total;
  const end = (index + 1) / total;
  const mid = start + (end - start) * 0.6;

  const exitRotate = useTransform(progress, [start, end], [0, -42]);
  const enterRotate = useTransform(progress, [prevStart, start], [10, 0]);
  const rotateX = useTransform([enterRotate, exitRotate], ([a, b]: number[]) => a + b);

  const exitY = useTransform(progress, [start, end], [0, -320]);
  const enterY = useTransform(progress, [prevStart, start], [70, 0]);
  const y = useTransform([enterY, exitY], ([a, b]: number[]) => a + b);

  const scale = useTransform(progress, [prevStart, start], [0.86, 1]);
  const opacity = useTransform(progress, [start, mid, end], [1, 1, 0]);

  return (
    <motion.div
      style={{ rotateX, y, scale, opacity, zIndex: total - index, transformPerspective: 1600 }}
      className="absolute w-[88%] sm:w-[520px] lg:w-[600px] aspect-[4/5] sm:aspect-[5/4] origin-bottom"
    >
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden glass-strong shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] border border-white/10">
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          {item.popular && (
            <span className="bg-gradient-to-r from-ember to-gold text-bg text-xs font-bold px-3 py-1 rounded-full">
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

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-bold text-2xl sm:text-3xl leading-tight">{item.name}</h3>
            <span className="text-gold font-bold text-xl whitespace-nowrap">{item.price.toFixed(2)}€</span>
          </div>
          <p className="text-cream/70 text-sm sm:text-base max-w-md mb-5">{item.description}</p>

          <motion.button
            onClick={() => addItem(item)}
            whileTap={{ scale: 0.94 }}
            className="relative w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold bg-cream/10 hover:bg-gradient-to-r hover:from-ember hover:to-gold hover:text-bg transition-colors duration-300"
          >
            {lastAddedId === item.id ? (
              <>
                <Check size={16} /> Ajouté !
              </>
            ) : (
              <>
                <Plus size={16} /> Ajouter au panier
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export function MenuStack({ items }: { items: MenuItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = Math.max(items.length, 1);

  return (
    <section
      ref={containerRef}
      style={{ height: `${total * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-[100svh] flex items-center justify-center overflow-hidden bg-noise">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center z-30 pointer-events-none px-6">
          <p className="text-ember font-semibold mb-1 uppercase tracking-widest text-xs sm:text-sm">
            Fais glisser pour découvrir
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Notre <span className="text-gradient">carte</span>
          </h2>
        </div>

        {items.map((item, i) => (
          <StackCard key={item.id} item={item} index={i} total={total} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
