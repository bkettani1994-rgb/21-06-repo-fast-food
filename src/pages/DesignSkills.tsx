import { motion } from "framer-motion";
import {
  Box,
  Sparkles,
  Wand2,
  Layers,
  MousePointerClick,
  Orbit,
  Film,
  Boxes,
  Waves,
  Component,
  Rocket,
  ExternalLink,
} from "lucide-react";

type Skill = {
  name: string;
  category: string;
  description: string;
  icon: typeof Box;
};

const skills: Skill[] = [
  { name: "Three.js", category: "Core 3D & Animation", description: "WebGL scenes, meshes, lighting and cameras for real-time 3D on the web.", icon: Box },
  { name: "React Three Fiber", category: "Core 3D & Animation", description: "Declarative Three.js inside React, with hooks and the React render lifecycle.", icon: Boxes },
  { name: "GSAP", category: "Core 3D & Animation", description: "Industry-standard timeline animation for buttery scroll and UI motion.", icon: Waves },
  { name: "Motion", category: "Core 3D & Animation", description: "Framer Motion-powered React animation, gestures and layout transitions.", icon: Sparkles },
  { name: "Babylon.js", category: "Core 3D & Animation", description: "Full-featured 3D engine for games and immersive product experiences.", icon: Orbit },
  { name: "A-Frame", category: "Extended 3D & Scroll", description: "Declarative WebVR/AR scenes built with HTML-like markup.", icon: Layers },
  { name: "Vanta", category: "Extended 3D & Scroll", description: "Drop-in animated backgrounds for heroes and section dividers.", icon: Waves },
  { name: "PlayCanvas", category: "Extended 3D & Scroll", description: "Real-time engine for interactive 3D and lightweight browser games.", icon: Rocket },
  { name: "PixiJS", category: "Extended 3D & Scroll", description: "GPU-accelerated 2D rendering for crisp interactive graphics.", icon: Component },
  { name: "Locomotive Scroll", category: "Extended 3D & Scroll", description: "Smooth, parallax-driven scrolling for narrative landing pages.", icon: MousePointerClick },
  { name: "Barba.js", category: "Extended 3D & Scroll", description: "Seamless page transitions for multi-page sites without a framework rewrite.", icon: Film },
  { name: "React Spring", category: "Animation & Components", description: "Physics-based spring animations for natural, interruptible motion.", icon: Sparkles },
  { name: "Magic UI", category: "Animation & Components", description: "Pre-built animated React components for marketing sites.", icon: Wand2 },
  { name: "AOS", category: "Animation & Components", description: "Animate-on-scroll attributes for fast, declarative reveal effects.", icon: MousePointerClick },
  { name: "Anime.js", category: "Animation & Components", description: "Lightweight, flexible JS animation engine for CSS, SVG and DOM.", icon: Sparkles },
  { name: "Lottie", category: "Animation & Components", description: "Render After Effects animations natively on the web.", icon: Film },
  { name: "Blender", category: "3D Authoring", description: "Asset and scene authoring workflows for web-ready 3D models.", icon: Box },
  { name: "Spline", category: "3D Authoring", description: "Browser-based 3D design tool with one-click web embeds.", icon: Orbit },
  { name: "Rive", category: "3D Authoring", description: "Interactive vector animations with state machines for product UI.", icon: Component },
  { name: "Substance 3D", category: "3D Authoring", description: "Material and texture authoring for photoreal 3D surfaces.", icon: Layers },
  { name: "Integration Patterns", category: "Meta-Skills", description: "Architectural guidance for combining 3D, animation and scroll libraries.", icon: Boxes },
  { name: "Modern Web Design", category: "Meta-Skills", description: "Design system fundamentals for contemporary, animated web products.", icon: Wand2 },
];

const categories = Array.from(new Set(skills.map((s) => s.category)));

export function DesignSkills() {
  return (
    <div className="bg-bg bg-noise min-h-screen">
      <header className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-ember/20 blur-3xl animate-pulse-glow" />
          <div className="absolute right-10 top-40 h-40 w-40 rounded-full bg-gold/20 blur-2xl animate-float" />
          <div className="absolute left-10 top-64 h-32 w-32 rounded-full bg-flame/20 blur-2xl animate-float-slow" />
        </div>

        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-cream/80"
        >
          <Sparkles size={14} className="text-gold" />
          22 skills · 27 plugins · MIT licensed
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-5xl font-bold leading-tight sm:text-6xl"
        >
          A design agency
          <br />
          <span className="text-gradient">skillstack</span> for Claude
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-cream/60"
        >
          3D/WebGL, scroll storytelling, and motion design skills for Claude Code —
          packaged, validated, and ready to install.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <code className="glass-strong rounded-xl px-4 py-2.5 text-sm text-cream/90">
            /plugin marketplace add freshtechbro/claudedesignskills
          </code>
          <a
            href="https://github.com/freshtechbro/claudedesignskills"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-ember to-gold px-4 py-2.5 text-sm font-medium text-bg transition-transform hover:scale-105"
          >
            <ExternalLink size={16} />
            View on GitHub
          </a>
        </motion.div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {categories.map((category, ci) => (
          <section key={category} className="mb-14">
            <motion.h2
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold"
            >
              {category}
            </motion.h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills
                .filter((s) => s.category === category)
                .map((skill, i) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.35, delay: (ci * 0.02 + i * 0.05) % 0.4 }}
                      whileHover={{ y: -4 }}
                      className="glass group rounded-2xl p-5 transition-colors hover:border-ember/40"
                    >
                      <div className="mb-3 inline-flex rounded-xl bg-gradient-to-br from-ember/20 to-gold/20 p-2.5 text-flame transition-transform group-hover:scale-110">
                        <Icon size={20} />
                      </div>
                      <h3 className="mb-1 font-display text-lg font-semibold text-cream">
                        {skill.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-cream/55">
                        {skill.description}
                      </p>
                    </motion.div>
                  );
                })}
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-cream/40">
        freshtechbro/claudedesignskills — install via Claude Code's plugin marketplace
      </footer>
    </div>
  );
}
