import { motion } from "framer-motion";
import { ArrowLeft, Bike, ChefHat, CookingPot, PackageCheck, PartyPopper } from "lucide-react";
import { Link } from "react-router-dom";
import { useOrders, STATUS_FLOW, STATUS_LABELS } from "../context/OrderContext";
import type { OrderStatus } from "../types";

const icons: Record<OrderStatus, typeof Bike> = {
  received: PackageCheck,
  preparing: ChefHat,
  cooking: CookingPot,
  delivering: Bike,
  delivered: PartyPopper,
};

const statusColors: Record<OrderStatus, string> = {
  received: "bg-blue-500/20 text-blue-300",
  preparing: "bg-amber-500/20 text-amber-300",
  cooking: "bg-orange-500/20 text-orange-300",
  delivering: "bg-purple-500/20 text-purple-300",
  delivered: "bg-green-500/20 text-green-300",
};

export function Dashboard() {
  const { orders, updateStatus } = useOrders();

  const active = orders.filter((o) => o.status !== "delivered");
  const completed = orders.filter((o) => o.status === "delivered");

  return (
    <div className="min-h-screen bg-bg bg-noise px-6 lg:px-10 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-cream/60 hover:text-cream mb-3 text-sm transition-colors">
              <ArrowLeft size={16} /> Retour au site
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Dashboard <span className="text-gradient">Restaurant</span>
            </h1>
            <p className="text-cream/60 mt-1">Gérez les commandes entrantes en temps réel.</p>
          </div>
          <div className="glass rounded-2xl px-5 py-3 text-center">
            <p className="text-2xl font-bold text-gold">{active.length}</p>
            <p className="text-xs text-cream/60">en cours</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center text-cream/50">
            Aucune commande pour le moment. Les nouvelles commandes apparaîtront ici instantanément.
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="font-semibold text-cream/70 text-sm uppercase tracking-widest">Commandes actives</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {active.map((order) => {
                const idx = STATUS_FLOW.indexOf(order.status);
                const Icon = icons[order.status];
                const nextStatus = STATUS_FLOW[idx + 1];
                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-3xl p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold">{order.id}</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ${statusColors[order.status]}`}>
                        <Icon size={13} /> {STATUS_LABELS[order.status]}
                      </span>
                    </div>
                    <p className="text-sm text-cream/70">{order.customerName}</p>
                    <p className="text-xs text-cream/50 mb-3">{order.address}</p>
                    <ul className="text-sm text-cream/70 space-y-1 mb-4">
                      {order.lines.map((l) => (
                        <li key={l.item.id} className="flex justify-between">
                          <span>{l.quantity}× {l.item.name}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="font-bold text-gold">{order.total.toFixed(2)}€</span>
                      {nextStatus && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateStatus(order.id, nextStatus)}
                          className="bg-gradient-to-r from-ember to-gold text-bg text-xs font-bold px-4 py-2 rounded-full"
                        >
                          → {STATUS_LABELS[nextStatus]}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {completed.length > 0 && (
              <>
                <h2 className="font-semibold text-cream/70 text-sm uppercase tracking-widest pt-6">
                  Commandes livrées
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {completed.map((order) => (
                    <div key={order.id} className="glass rounded-3xl p-5 opacity-60">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">{order.id}</span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/20 text-green-300">
                          Livrée
                        </span>
                      </div>
                      <p className="text-sm text-cream/70">{order.customerName}</p>
                      <p className="font-bold text-gold mt-2">{order.total.toFixed(2)}€</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
