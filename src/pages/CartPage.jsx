import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex gap-4 py-6 border-b border-brand-gray-200">
      {/* Image */}
      <Link to={`/products/${item.id}`} className="shrink-0">
        <div className="w-20 md:w-24 aspect-[3/4] overflow-hidden bg-brand-gray-100">
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-1">
              {item.category}
            </p>
            <h3 className="font-body font-medium text-brand-black text-sm md:text-base">
              {item.name}
            </h3>
            <p className="font-mono text-xs text-brand-gray-400 tracking-wider mt-1">
              Size: {item.selectedSize}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(item.id, item.selectedSize)}
            className="text-brand-gray-400 hover:text-brand-black transition-colors duration-200 shrink-0"
          >
            <Trash2 size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Quantity + Price */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-brand-gray-300">
            <button
              onClick={() =>
                item.quantity > 1
                  ? updateQuantity(item.id, item.selectedSize, item.quantity - 1)
                  : removeFromCart(item.id, item.selectedSize)
              }
              className="w-8 h-8 flex items-center justify-center text-brand-gray-400 hover:text-brand-black transition-colors duration-200"
            >
              <Minus size={12} />
            </button>
            <span className="w-10 text-center font-mono text-sm text-brand-black">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-brand-gray-400 hover:text-brand-black transition-colors duration-200"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="font-mono text-sm text-brand-black">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const shipping = cartTotal >= 150 ? 0 : 9.99;
  const total = cartTotal + shipping;

  return (
    <main className="min-h-screen pt-24 md:pt-28 bg-brand-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-2">
              {cart.items.length} Items
            </p>
            <h1 className="font-display text-6xl md:text-7xl tracking-wider text-brand-black">
              YOUR CART
            </h1>
          </div>
          {cart.items.length > 0 && (
            <button
              onClick={clearCart}
              className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 hover:text-brand-black transition-colors duration-300 underline underline-offset-4 mb-2"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.items.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-32 text-center gap-6">
            <div className="w-20 h-20 border border-brand-gray-300 flex items-center justify-center">
              <ShoppingBag size={28} strokeWidth={1} className="text-brand-gray-300" />
            </div>
            <div>
              <p className="font-display text-3xl tracking-wider text-brand-black mb-2">
                YOUR CART IS EMPTY
              </p>
              <p className="font-body text-brand-gray-500 text-sm">
                Looks like you haven't added anything yet.
              </p>
            </div>
            <Link to="/products" className="btn-primary flex items-center gap-2">
              Start Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2">
              {cart.items.map((item) => (
                <CartItem key={`${item.id}-${item.selectedSize}`} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-brand-gray-200 p-6 sticky top-28 bg-brand-gray-50">
                <h2 className="font-mono text-xs tracking-widest uppercase text-brand-gray-500 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-brand-gray-500">Subtotal</span>
                    <span className="font-mono text-sm text-brand-black">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-brand-gray-500">Shipping</span>
                    <span className="font-mono text-sm text-brand-black">
                      {shipping === 0 ? (
                        <span className="text-brand-gray-400">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="font-mono text-xs text-brand-gray-400 tracking-wider">
                      Add ${(150 - cartTotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                <div className="border-t border-brand-gray-200 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-mono text-xs tracking-widest uppercase text-brand-gray-500">
                      Total
                    </span>
                    <span className="font-mono text-xl text-brand-black">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="flex mb-6 gap-0">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 bg-brand-white border border-brand-gray-300 px-4 py-2.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-300"
                  />
                  <button className="bg-brand-gray-300 hover:bg-brand-gray-400 text-brand-black font-mono text-xs tracking-widest uppercase px-4 py-2.5 transition-colors duration-300">
                    Apply
                  </button>
                </div>

                <Link
                  to="/checkout"
                  className="w-full bg-brand-black text-brand-white font-mono text-sm tracking-widest uppercase py-4 hover:bg-brand-gray-700 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Checkout <ArrowRight size={16} />
                </Link>

                <Link
                  to="/products"
                  className="block text-center font-mono text-xs tracking-widest uppercase text-brand-gray-400 hover:text-brand-black transition-colors duration-300 py-3 mt-2"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
