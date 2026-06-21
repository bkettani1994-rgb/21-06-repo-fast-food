import { motion } from "framer-motion";
import { Bike, ChefHat, CookingPot, PackageCheck, PartyPopper } from "lucide-react";
import { useOrders, STATUS_FLOW, STATUS_LABELS } from "../context/OrderContext";
import type { OrderStatus } from "../types";

const icons: Record<OrderStatus, typeof Bike> = {
  received: PackageCheck,
  preparing: ChefHat,
  cooking: CookingPot,
  delivering: Bike,
  delivered: PartyPopper,
};

export function OrderTracking() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <section id="tracking" className="py-24 px-6 lg:px-10 max-w-4xl mx-auto text-center">
        <p className="text-ember font-semibold mb-2 uppercase tracking-widest text-sm">Suivi en direct</p>
        <h2 className="text-4xl font-bold mb-4">Aucune commande pour l'instant</h2>
        <p className="text-cream/60">
          Passez une commande depuis le menu pour suivre sa préparation en temps réel ici.
        </p>
      </section>
    );
  }

  return (
    <section id="tracking" className="py-24 px-6 lg:px-10 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-ember font-semibold mb-2 uppercase tracking-widest text-sm">Suivi en direct</p>
        <h2 className="text-4xl font-bold">Ta commande, étape par étape</h2>
      </motion.div>

      <div className="space-y-8">
        {orders.map((order) => {
          const activeIdx = STATUS_FLOW.indexOf(order.status);
          return (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-6 lg:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
                <div>
                  <p className="text-cream/50 text-sm">Commande</p>
                  <p className="font-bold text-xl">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-cream/50 text-sm">Total</p>
                  <p className="font-bold text-xl text-gold">{order.total.toFixed(2)}€</p>
                </div>
              </div>

              <div className="relative flex justify-between">
                <div className="absolute top-5 left-0 right-0 h-1 bg-white/10 rounded-full" />
                <motion.div
                  className="absolute top-5 left-0 h-1 bg-gradient-to-r from-ember to-gold rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(activeIdx / (STATUS_FLOW.length - 1)) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {STATUS_FLOW.map((status, idx) => {
                  const Icon = icons[status];
                  const isDone = idx <= activeIdx;
                  const isCurrent = idx === activeIdx;
                  return (
                    <div key={status} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                      <motion.div
                        animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 1.4, repeat: isCurrent ? Infinity : 0 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                          isDone
                            ? "bg-gradient-to-br from-ember to-gold border-transparent text-bg"
                            : "bg-surface border-white/20 text-cream/30"
                        }`}
                      >
                        <Icon size={18} />
                      </motion.div>
                      <span
                        className={`text-[11px] sm:text-xs text-center max-w-[70px] transition-colors ${
                          isDone ? "text-cream" : "text-cream/40"
                        }`}
                      >
                        {STATUS_LABELS[status]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {order.status !== "delivered" ? (
                <p className="text-center text-cream/60 text-sm mt-8">
                  Mise à jour automatique en temps réel...
                </p>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gold font-semibold mt-8"
                >
                  🎉 Bon appétit, {order.customerName} !
                </motion.p>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
