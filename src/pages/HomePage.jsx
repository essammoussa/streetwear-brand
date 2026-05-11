import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ui/ProductCard";

// ─── Hero Section ───────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1800&q=85"
          alt="Hero"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-28 w-full">
        <div className={`transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-300 mb-4">
            SS25 Collection
          </p>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-none tracking-wider text-white mb-2">
            DEFINE
          </h1>
          <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-none tracking-wider text-brand-gray-300 mb-8">
            WAR OF LIFE
          </h1>
        </div>
        <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Link to="/products" className="bg-brand-white text-brand-black font-semibold text-sm tracking-widest uppercase px-8 py-3.5 transition-all duration-300 hover:bg-brand-gray-200 inline-block">
            Shop Now
          </Link>
          <Link to="/products?collection=SS25" className="border border-white text-white font-semibold text-sm tracking-widest uppercase px-8 py-3.5 transition-all duration-300 hover:bg-white hover:text-brand-black inline-block">
            SS25 Lookbook
          </Link>
        </div>
      </div>
      
    </section>
  );
}

// ─── Marquee Banner ──────────────────────────────────────────────────────────
function MarqueeBanner() {
  const items = ["New Collection", "SS25", "Free Shipping $150+", "Streetwear", "Limited Drops", "Quality First"];
  return (
    <div className="overflow-hidden py-4 border-y border-brand-gray-200 bg-brand-white">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-display text-2xl tracking-widest text-brand-gray-300 mx-8">
            {item} <span className="text-brand-gray-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Featured Products ────────────────────────────────────────────────────────
function FeaturedProducts() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-2">
            Curated Selection
          </p>
          <h2 className="font-display text-6xl md:text-7xl tracking-wider text-brand-black">
            FEATURED
          </h2>
        </div>
        <Link
          to="/products"
          className="hidden md:flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-brand-gray-400 hover:text-brand-black transition-colors duration-300"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-10 md:hidden">
        <Link to="/products" className="btn-outline">
          View All Products
        </Link>
      </div>
    </section>
  );
}

// ─── New Collection Section ───────────────────────────────────────────────────
function NewCollection() {
  const newItems = products.filter((p) => p.isNew).slice(0, 2);
  return (
    <section id="new-arrivals" className="bg-brand-black py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Text Block */}
          <div className="flex flex-col justify-center py-12 md:pr-16">
            <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-4">
              Now Available
            </p>
            <h2 className="font-display text-6xl md:text-8xl leading-none tracking-wider text-white mb-6">
              NEW<br />DROPS
            </h2>
            <p className="font-body text-brand-gray-400 text-base leading-relaxed mb-8 max-w-sm">
              The Spring/Summer 2025 collection is here. Built for the streets, designed for the culture. Limited quantities — act fast.
            </p>
            <Link to="/products?filter=new" className="bg-brand-white text-brand-black font-semibold text-sm tracking-widest uppercase px-8 py-3.5 transition-all duration-300 hover:bg-brand-gray-200 inline-block w-fit flex items-center gap-2">
              Shop New Arrivals <ArrowUpRight size={16} />
            </Link>
          </div>
          {/* Images */}
          <div className="grid grid-cols-2 gap-3">
            {newItems.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`} className="group overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-3">
                  <p className="font-body text-sm text-white font-medium">{product.name}</p>
                  <p className="font-mono text-xs text-brand-gray-400">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Categories Grid ──────────────────────────────────────────────────────────
function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-12">
        <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-2">
          Browse
        </p>
        <h2 className="font-display text-6xl md:text-7xl tracking-wider text-brand-black">
          CATEGORIES
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.name}`}
            className="group relative overflow-hidden aspect-square"
          >
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-black/50 group-hover:bg-brand-black/30 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <p className="font-mono text-xs tracking-widest uppercase text-white/60 mb-1">
                {cat.count} Items
              </p>
              <h3 className="font-display text-2xl md:text-3xl tracking-wider text-white">
                {cat.name.toUpperCase()}
              </h3>
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight size={14} className="text-white" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <section id="contact" className="border-t border-brand-gray-200 py-24 bg-brand-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-4">
          Stay Connected
        </p>
        <h2 className="font-display text-5xl md:text-7xl tracking-wider text-brand-black mb-4">
          JOIN WAR OF LIFE
        </h2>
        <p className="font-body text-brand-gray-500 text-base max-w-md mx-auto mb-10">
          Get early access to new drops, exclusive offers, and updates from behind the scenes.
        </p>
        {submitted ? (
          <div className="font-mono text-sm tracking-widest uppercase text-brand-black">
            ✓ You're In — Watch Your Inbox
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-brand-white border border-brand-gray-300 px-5 py-3.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-300"
            />
            <button type="submit" className="bg-brand-black text-brand-white font-mono text-xs tracking-widest uppercase px-6 py-3.5 hover:bg-brand-gray-700 transition-colors duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </form>
        )}
        <p className="font-mono text-xs text-brand-gray-400 mt-4 tracking-wider">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main>
      <Hero />
      <MarqueeBanner />
      <FeaturedProducts />
      <NewCollection />
      <CategoriesSection />
      <Newsletter />
    </main>
  );
}
