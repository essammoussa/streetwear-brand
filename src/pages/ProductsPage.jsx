import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/ui/ProductCard";

const allCategories = ["All", "T-Shirts", "Hoodies", "Bottoms", "Outerwear", "Sweatshirts", "Accessories"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [sort, setSort] = useState("featured");
  const [showNew, setShowNew] = useState(searchParams.get("filter") === "new");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (showNew) list = list.filter((p) => p.isNew);
    switch (sort) {
      case "newest": list = list.sort((a, b) => b.id - a.id); break;
      case "price-asc": list = list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list = list.sort((a, b) => b.price - a.price); break;
      default: list = list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    return list;
  }, [activeCategory, sort, showNew]);

  return (
    <main className="min-h-screen pt-24 md:pt-28 bg-brand-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-2">
          {filtered.length} Products
        </p>
        <h1 className="font-display text-6xl md:text-8xl tracking-wider text-brand-black">
          {activeCategory === "All" ? "ALL PRODUCTS" : activeCategory.toUpperCase()}
        </h1>
      </div>

      {/* Filter Bar */}
      <div className="border-y border-brand-gray-200 py-4 mb-10 sticky top-16 md:top-20 z-30 bg-brand-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          {/* Category Tabs — desktop */}
          <div className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs tracking-widest uppercase px-4 py-2 transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-brand-black text-brand-white"
                    : "text-brand-gray-400 hover:text-brand-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="md:hidden flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-brand-gray-500"
          >
            <SlidersHorizontal size={14} /> Filters
          </button>

          {/* Right Controls */}
          <div className="flex items-center gap-4 ml-auto">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setShowNew(!showNew)}
                className={`w-8 h-4 rounded-full transition-colors duration-300 relative ${
                  showNew ? "bg-brand-black" : "bg-brand-gray-300"
                }`}
              >
                <div className={`absolute top-0.5 w-3 h-3 bg-brand-white rounded-full transition-transform duration-300 shadow-sm ${showNew ? "translate-x-4" : "translate-x-0.5"}`} />
              </div>
              <span className="font-mono text-xs tracking-widest uppercase text-brand-gray-500">
                New Only
              </span>
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent border border-brand-gray-300 text-brand-gray-500 font-mono text-xs tracking-widest uppercase px-3 py-2 outline-none focus:border-brand-black cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-brand-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Category Dropdown */}
        {filterOpen && (
          <div className="md:hidden border-t border-brand-gray-200 mt-4 pt-4 px-6 grid grid-cols-3 gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setFilterOpen(false); }}
                className={`font-mono text-xs tracking-widest uppercase px-3 py-2 text-center transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-black text-brand-white"
                    : "border border-brand-gray-300 text-brand-gray-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-mono text-sm tracking-widest uppercase text-brand-gray-400">
              No products found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
