import { motion } from "framer-motion";
import { Bike, ShieldCheck, Sparkles, Timer } from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "18 minutes chrono",
    desc: "Préparation rapide et livraison express partout en ville.",
  },
  {
    icon: Sparkles,
    title: "Ingrédients premium",
    desc: "Produits frais sélectionnés chaque matin chez nos producteurs locaux.",
  },
  {
    icon: Bike,
    title: "Suivi temps réel",
    desc: "Suivez chaque étape de votre commande sur une timeline animée.",
  },
  {
    icon: ShieldCheck,
    title: "Paiement sécurisé",
    desc: "Commandez en toute confiance avec un paiement 100% sécurisé.",
  },
];

export function Features() {
  return (
    <section id="about" className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, idx) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="glass rounded-3xl p-6 text-center"
          >
            <div className="inline-flex bg-gradient-to-br from-ember to-gold rounded-2xl p-3 mb-4">
              <f.icon size={24} className="text-bg" />
            </div>
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-cream/60 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
