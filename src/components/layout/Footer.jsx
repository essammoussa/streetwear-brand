import { Link } from "react-router-dom";
import { Globe, X, Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-brand-gray-700 mt-auto">
      {/* Marquee */}
      <div className="overflow-hidden py-3 border-b border-brand-gray-700 bg-brand-gray-200">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(8).fill("FREE SHIPPING ON ORDERS OVER $150 — NEW SS25 COLLECTION DROPPING SOON — ").map((t, i) => (
            <span key={i} className="font-mono text-xs tracking-widest uppercase text-brand-black mx-8">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <Link to="/" className="font-display text-4xl tracking-wider text-white block mb-4">
            WAR OF LIFE
          </Link>
          <p className="text-brand-gray-400 text-sm leading-relaxed max-w-xs font-body">
            Streetwear for the undefined generation. Quality without compromise. Identity without labels.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-brand-gray-400 hover:text-white transition-colors duration-300">
              <Globe size={18} strokeWidth={1.5} />
            </a>
            <a href="#" className="text-brand-gray-400 hover:text-white transition-colors duration-300">
              <X size={18} strokeWidth={1.5} />
            </a>
            <a href="#" className="text-brand-gray-400 hover:text-white transition-colors duration-300">
              <Play size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-6">Shop</h3>
          <ul className="space-y-3">
            {["New Arrivals", "T-Shirts", "Hoodies", "Bottoms", "Outerwear", "Accessories"].map((item) => (
              <li key={item}>
                <Link to="/products" className="text-brand-gray-400 hover:text-white text-sm transition-colors duration-300 font-body">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-6">Support</h3>
          <ul className="space-y-3">
            {["Shipping & Returns", "Size Guide", "FAQ", "Contact Us", "Terms", "Privacy"].map((item) => (
              <li key={item}>
                <a href="#" className="text-brand-gray-400 hover:text-white text-sm transition-colors duration-300 font-body">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-gray-700 py-6 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs text-brand-gray-400 tracking-wider">
          © 2025 WAR OF LIFE. ALL RIGHTS RESERVED.
        </p>
        <p className="font-mono text-xs text-brand-gray-600 tracking-wider">
          CRAFTED WITH PRECISION
        </p>
      </div>
    </footer>
  );
}
