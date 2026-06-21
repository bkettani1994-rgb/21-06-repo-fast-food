import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star, Clock, Flame } from "lucide-react";
import { FuturisticBackground } from "./FuturisticBackground";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-noise"
    >
      <FuturisticBackground />

      {/* Mouse-following spotlight */}
      <motion.div
        className="absolute w-[36rem] h-[36rem] rounded-full pointer-events-none mix-blend-screen"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(255,140,60,0.25) 0%, rgba(255,194,61,0.08) 45%, transparent 70%)",
        }}
      />

      <motion.div
        style={{ y: y2, opacity }}
        className="absolute -top-20 -left-20 w-[28rem] h-[28rem] bg-ember/30 rounded-full blur-[120px]"
      />
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-40 right-0 w-[24rem] h-[24rem] bg-gold/20 rounded-full blur-[120px]"
      />
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg z-10"
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm"
          >
            <Flame size={16} className="text-ember" />
            <span>Livraison express en 18 minutes</span>
          </motion.div>

          <h1 className="relative text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
            Du goût qui{" "}
            <span className="relative inline-block text-gradient">
              enflamme
              <motion.span
                aria-hidden
                className="absolute inset-0 text-gradient blur-md"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                enflamme
              </motion.span>
            </span>{" "}
            tes papilles
          </h1>

          <p className="text-lg text-cream/70 max-w-md mb-8">
            Burgers gourmets, tacos généreux et accompagnements croustillants,
            préparés minute et livrés brûlants devant votre porte.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-ember to-gold text-bg font-semibold px-7 py-4 rounded-full overflow-hidden shadow-[0_0_40px_-10px_rgba(255,91,46,0.7)]"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-white/20" />
              <span className="relative">Commander maintenant</span>
              <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="#tracking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass rounded-full px-7 py-4 font-semibold hover:bg-white/10 transition-colors"
            >
              Suivre ma commande
            </motion.a>
          </div>

          <div className="flex items-center gap-8 mt-10">
            <div className="flex items-center gap-2">
              <Star size={18} className="text-gold fill-gold" />
              <span className="font-semibold">4.9/5</span>
              <span className="text-cream/50 text-sm">(2.3k avis)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-ember" />
              <span className="font-semibold">18 min</span>
              <span className="text-cream/50 text-sm">en moyenne</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative flex justify-center"
        >
          <motion.div
            animate={{ rotate: [0, 4, 0, -4, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[280px] sm:w-[380px] lg:w-[460px] aspect-square rounded-full"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ember via-flame to-gold blur-2xl opacity-50 animate-pulse-glow" />

            {/* Rotating neon ring */}
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="url(#neon-gradient)"
                strokeWidth="0.6"
                strokeDasharray="6 10"
              />
              <defs>
                <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff5b2e" />
                  <stop offset="100%" stopColor="#ffc23d" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Counter-rotating dashed ring for depth */}
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] opacity-40"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="50" cy="50" r="49" fill="none" stroke="#ffc23d" strokeWidth="0.3" strokeDasharray="1 4" />
            </motion.svg>

            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&auto=format&fit=crop"
              alt="Burger signature"
              className="relative w-full h-full object-cover rounded-full border-4 border-white/10 shadow-2xl"
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-2 sm:left-0 glass-strong rounded-2xl px-4 py-3 animate-float-slow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs text-cream/60">Aujourd'hui</p>
            <p className="font-bold text-gold">-20% dès 25€</p>
          </motion.div>

          <motion.div
            className="absolute top-6 -right-2 sm:right-0 glass-strong rounded-2xl px-4 py-3 animate-float"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-2xl">🌮</p>
            <p className="text-xs font-semibold">Tacos frais</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
