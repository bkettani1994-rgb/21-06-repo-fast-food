import { Flame, Camera, MessageCircle, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span className="bg-gradient-to-br from-ember to-gold p-1.5 rounded-xl">
            <Flame size={18} className="text-bg" />
          </span>
          Blaze<span className="text-gradient">Bite</span>
        </div>
        <p className="text-cream/40 text-sm">© 2026 BlazeBite. Tous droits réservés.</p>
        <div className="flex gap-3">
          <a href="#" className="glass p-2.5 rounded-full hover:bg-white/10 transition-colors">
            <Camera size={16} />
          </a>
          <a href="#" className="glass p-2.5 rounded-full hover:bg-white/10 transition-colors">
            <MessageCircle size={16} />
          </a>
          <a href="#" className="glass p-2.5 rounded-full hover:bg-white/10 transition-colors">
            <Send size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
