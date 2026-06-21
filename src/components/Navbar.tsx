import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, LayoutDashboard, Menu as MenuIcon, X } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#tracking", label: "Suivi commande" },
  { href: "#about", label: "À propos" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-gradient-to-br from-ember to-gold p-1.5 rounded-xl">
            <Flame size={20} className="text-bg" />
          </span>
          Blaze<span className="text-gradient">Bite</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-cream/80 hover:text-cream transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 glass rounded-full px-4 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            <LayoutDashboard size={16} /> Espace restaurant
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass-strong mt-2 mx-4 rounded-2xl p-4 flex flex-col gap-3"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-cream/80">
              {l.label}
            </a>
          ))}
          <Link to="/dashboard" onClick={() => setOpen(false)} className="py-2 font-semibold text-gold">
            Espace restaurant
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
