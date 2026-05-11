import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product, product.sizes[0]);
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      {/* Image Container */}
      <div
        className="relative overflow-hidden bg-brand-gray-100 aspect-[3/4] mb-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Main Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          } ${hovered && product.images[1] ? "opacity-0" : "opacity-100"}`}
        />

        {/* Hover Image */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-brand-black/20 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Quick Add */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-0 left-0 right-0 bg-brand-black text-brand-white font-mono text-xs tracking-widest uppercase py-3.5 flex items-center justify-center gap-2 transition-all duration-300 hover:bg-brand-gray-700 ${
            hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <ShoppingBag size={14} />
          Quick Add
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-brand-black text-brand-white font-mono text-xs tracking-wider px-2 py-0.5 uppercase">
              New
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-xs tracking-wider uppercase text-brand-gray-400 mb-1">
            {product.category}
          </p>
          <h3 className="font-body font-medium text-brand-black text-sm leading-tight group-hover:text-brand-gray-500 transition-colors duration-200">
            {product.name}
          </h3>
        </div>
        <span className="font-mono text-sm text-brand-black shrink-0">
          ${product.price}
        </span>
      </div>
    </Link>
  );
}
