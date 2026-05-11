import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft, ArrowRight, X } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ui/ProductCard";

// ─── Size Guide Modal ───────────────────────────────────────────────────────
function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-brand-white w-full max-w-2xl shadow-xl animate-fade-in flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-brand-gray-200">
          <h2 className="font-display text-3xl tracking-wider text-brand-black">SIZE GUIDE</h2>
          <button onClick={onClose} className="text-brand-gray-400 hover:text-brand-black transition-colors">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <p className="font-body text-brand-gray-500 text-sm mb-6">
            Our garments are designed with an oversized fit. We recommend ordering your true size for the intended look, or sizing down if you prefer a more standard fit.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr>
                  <th className="font-mono text-xs tracking-widest uppercase text-brand-gray-500 border-b border-brand-gray-200 pb-3">Size</th>
                  <th className="font-mono text-xs tracking-widest uppercase text-brand-gray-500 border-b border-brand-gray-200 pb-3">Chest (in)</th>
                  <th className="font-mono text-xs tracking-widest uppercase text-brand-gray-500 border-b border-brand-gray-200 pb-3">Length (in)</th>
                  <th className="font-mono text-xs tracking-widest uppercase text-brand-gray-500 border-b border-brand-gray-200 pb-3">Sleeve (in)</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm text-brand-black">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size, i) => (
                  <tr key={size} className={i % 2 === 0 ? "bg-brand-gray-50" : ""}>
                    <td className="py-4 px-2">{size}</td>
                    <td className="py-4 px-2">{38 + i * 2}</td>
                    <td className="py-4 px-2">{27 + i * 0.5}</td>
                    <td className="py-4 px-2">{33 + i * 0.5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-mono text-[10px] tracking-widest uppercase text-brand-gray-400 mt-6 text-center">
            Measurements may vary slightly due to garment dyeing process
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen pt-32 flex flex-col items-center justify-center gap-4 bg-brand-white">
        <p className="font-mono text-sm tracking-widest uppercase text-brand-gray-400">
          Product not found
        </p>
        <Link to="/products" className="btn-outline">
          Back to Shop
        </Link>
      </main>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    addToCart(product, selectedSize);
    setAdded(true);
    setSizeError(false);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen pt-20 bg-brand-white">
      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-brand-gray-400">
          <Link to="/" className="hover:text-brand-black transition-colors duration-200">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-brand-black transition-colors duration-200">Shop</Link>
          <span>/</span>
          <span className="text-brand-black">{product.name}</span>
        </div>
      </div>

      {/* Product Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Images */}
        <div className="flex gap-3">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex flex-col gap-2 w-16">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden border-2 transition-all duration-200 ${
                    activeImg === i ? "border-brand-black" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Image */}
          <div className="flex-1 relative overflow-hidden aspect-[3/4] bg-brand-gray-100">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-brand-black text-brand-white font-mono text-xs tracking-wider px-2 py-0.5 uppercase">
                New
              </span>
            )}
            {/* Image Nav Arrows */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setActiveImg((activeImg - 1 + product.images.length) % product.images.length)}
                  className="w-8 h-8 bg-brand-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-brand-white transition-colors duration-200 shadow-sm"
                >
                  <ArrowLeft size={14} className="text-brand-black" />
                </button>
                <button
                  onClick={() => setActiveImg((activeImg + 1) % product.images.length)}
                  className="w-8 h-8 bg-brand-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-brand-white transition-colors duration-200 shadow-sm"
                >
                  <ArrowRight size={14} className="text-brand-black" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col py-2">
          <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-2">
            {product.collection} — {product.category}
          </p>
          <h1 className="font-display text-4xl md:text-5xl tracking-wider text-brand-black mb-4">
            {product.name.toUpperCase()}
          </h1>
          <p className="font-mono text-2xl text-brand-black mb-8">${product.price}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {product.tags.map((tag) => (
              <span key={tag} className="border border-brand-gray-300 font-mono text-xs tracking-wider uppercase text-brand-gray-500 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-500">
                Size {selectedSize && <span className="text-brand-black">— {selectedSize}</span>}
              </p>
              <button 
                onClick={() => setShowSizeGuide(true)}
                className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 hover:text-brand-black transition-colors duration-200 underline underline-offset-4"
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setSizeError(false); }}
                  className={`w-12 h-12 font-mono text-sm transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-brand-black text-brand-white"
                      : "border border-brand-gray-300 text-brand-gray-500 hover:border-brand-black hover:text-brand-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="font-mono text-xs text-red-500 tracking-wider mt-2">
                Please select a size
              </p>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-3 font-mono text-sm tracking-widest uppercase py-4 transition-all duration-300 ${
              added
                ? "bg-brand-gray-200 text-brand-black"
                : "bg-brand-black text-brand-white hover:bg-brand-gray-700"
            }`}
          >
            <ShoppingBag size={16} />
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>

          <Link
            to="/cart"
            className="text-center font-mono text-xs tracking-widest uppercase text-brand-gray-400 hover:text-brand-black transition-colors duration-300 py-3 mt-2"
          >
            View Cart
          </Link>

          {/* Description */}
          <div className="border-t border-brand-gray-200 mt-8 pt-8">
            <h3 className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-4">
              Description
            </h3>
            <p className="font-body text-brand-gray-500 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Details */}
          <div className="border-t border-brand-gray-200 mt-8 pt-8">
            <h3 className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-4">
              Details
            </h3>
            <ul className="space-y-2 font-mono text-xs text-brand-gray-500 tracking-wider">
              <li>— 100% Organic Cotton</li>
              <li>— Garment Dyed</li>
              <li>— Made in Portugal</li>
              <li>— Machine Wash Cold</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-16 border-t border-brand-gray-200">
          <h2 className="font-display text-5xl tracking-wider text-brand-black mb-10">
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
