import { motion } from "framer-motion";

const PARTICLE_COUNT = 26;

function seededParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const seed = i * 137.5;
    return {
      id: i,
      left: (seed % 100),
      top: ((seed * 1.7) % 100),
      size: 2 + (i % 4),
      duration: 6 + (i % 8),
      delay: (i % 10) * 0.4,
    };
  });
}

const particles = seededParticles();

export function FuturisticBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,140,60,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,60,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 30%, transparent 80%)",
        }}
      />

      {/* Scanline sweep */}
      <motion.div
        className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-ember/15 to-transparent"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Drifting particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold shadow-[0_0_8px_2px_rgba(255,194,61,0.8)]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glow orbs handled separately by Hero for parallax */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/0 to-bg" />
    </div>
  );
}
