import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export function CartButton() {
  const { count, toggle } = useCart();
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-ember to-gold text-bg rounded-full p-4 shadow-[0_0_30px_-5px_rgba(255,91,46,0.8)]"
    >
      <ShoppingBag size={24} />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-bg text-cream text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-gold"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { lines, isOpen, close, increment, decrement, removeItem, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] glass-strong z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag size={20} className="text-ember" /> Mon panier
              </h3>
              <button onClick={close} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {lines.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center text-cream/50 gap-3"
                >
                  <span className="text-5xl">🛒</span>
                  <p>Ton panier est vide pour le moment.</p>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {lines.map((line) => (
                    <motion.div
                      key={line.item.id}
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40, height: 0 }}
                      className="flex gap-3 glass rounded-2xl p-3"
                    >
                      <img
                        src={line.item.image}
                        alt={line.item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between gap-2">
                          <p className="font-semibold text-sm leading-tight">{line.item.name}</p>
                          <button
                            onClick={() => removeItem(line.item.id)}
                            className="text-cream/40 hover:text-ember transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-gold font-bold text-sm mt-1">
                          {(line.item.price * line.quantity).toFixed(2)}€
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => decrement(line.item.id)}
                            className="bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-semibold w-5 text-center">{line.quantity}</span>
                          <button
                            onClick={() => increment(line.item.id)}
                            className="bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {lines.length > 0 && (
              <div className="p-5 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-cream/70">
                  <span>Sous-total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-gold">{total.toFixed(2)}€</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onCheckout}
                  className="w-full bg-gradient-to-r from-ember to-gold text-bg font-bold py-3.5 rounded-full mt-2"
                >
                  Passer la commande
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
