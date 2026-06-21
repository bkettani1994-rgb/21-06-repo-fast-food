import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MapPin, User, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";

export function Checkout({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (orderId: string) => void;
}) {
  const { lines, total, clear } = useCart();
  const { placeOrder } = useOrders();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [step, setStep] = useState<"form" | "success">("form");
  const [submitting, setSubmitting] = useState(false);

  const valid = name.trim().length > 1 && address.trim().length > 3 && lines.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    setTimeout(() => {
      const order = placeOrder(lines, total, name, address);
      clear();
      setSubmitting(false);
      setStep("success");
      onSuccess(order.id);
    }, 900);
  };

  const handleClose = () => {
    onClose();
    setStep("form");
    setName("");
    setAddress("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-[440px] glass-strong rounded-3xl p-6 z-50"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            {step === "form" ? (
              <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-bold mb-1">Finaliser la commande</h3>
                <p className="text-cream/60 text-sm mb-6">
                  Total à payer : <span className="text-gold font-bold">{total.toFixed(2)}€</span>
                </p>

                <div className="space-y-4">
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom complet"
                      required
                      className="w-full glass rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-ember/60 placeholder:text-cream/40"
                    />
                  </div>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Adresse de livraison"
                      required
                      className="w-full glass rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-ember/60 placeholder:text-cream/40"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={!valid || submitting}
                  whileHover={valid ? { scale: 1.02 } : {}}
                  whileTap={valid ? { scale: 0.97 } : {}}
                  className="w-full mt-6 bg-gradient-to-r from-ember to-gold text-bg font-bold py-3.5 rounded-full disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="w-5 h-5 border-2 border-bg/30 border-t-bg rounded-full"
                    />
                  ) : (
                    `Confirmer et payer ${total.toFixed(2)}€`
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
                  className="inline-flex bg-gradient-to-br from-ember to-gold rounded-full p-4 mb-4"
                >
                  <CheckCircle2 size={36} className="text-bg" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Commande confirmée !</h3>
                <p className="text-cream/60 mb-6">
                  Suivez la préparation de votre commande en temps réel ci-dessous.
                </p>
                <motion.a
                  href="#tracking"
                  whileHover={{ scale: 1.03 }}
                  onClick={handleClose}
                  className="inline-block bg-cream/10 hover:bg-cream/20 font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Voir le suivi
                </motion.a>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
