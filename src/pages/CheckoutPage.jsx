import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, CreditCard, Truck, CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

function CheckoutItem({ item }) {
  return (
    <div className="flex gap-4 py-4">
      <div className="relative w-16 h-20 bg-brand-gray-100 shrink-0 overflow-hidden">
        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
        <span className="absolute -top-1 -right-1 bg-brand-black text-brand-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {item.quantity}
        </span>
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="font-body text-sm text-brand-black font-medium">{item.name}</p>
          <p className="font-mono text-xs text-brand-gray-400 tracking-wider mt-0.5">
            Size: {item.selectedSize}
          </p>
        </div>
        <span className="font-mono text-sm text-brand-black">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const shipping = cartTotal >= 150 ? 0 : 9.99;
  const total = cartTotal + shipping;

  const [step, setStep] = useState(1); // 1: info, 2: shipping, 3: payment, 4: confirmation
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "Egypt",
    zipCode: "",
    phone: "",
    shippingMethod: "standard",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit order
      setStep(4);
      clearCart();
    }
  };

  // Redirect if cart is empty and not on confirmation
  if (cart.items.length === 0 && step !== 4) {
    return (
      <main className="min-h-screen pt-32 flex flex-col items-center justify-center gap-4 bg-brand-white">
        <p className="font-mono text-sm tracking-widest uppercase text-brand-gray-400">
          Your cart is empty
        </p>
        <Link to="/products" className="btn-primary">
          Shop Now
        </Link>
      </main>
    );
  }

  // Confirmation screen
  if (step === 4) {
    return (
      <main className="min-h-screen pt-24 md:pt-28 bg-brand-white">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div className="w-20 h-20 bg-brand-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} className="text-brand-black" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl tracking-wider text-brand-black mb-4">
            ORDER CONFIRMED
          </h1>
          <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-2">
            Order #VW-{Math.random().toString(36).substring(2, 8).toUpperCase()}
          </p>
          <p className="font-body text-brand-gray-500 text-base max-w-md mx-auto mb-10">
            Thank you for your order. You'll receive a confirmation email shortly with your tracking details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
            <Link to="/" className="btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const stepLabels = ["Information", "Shipping", "Payment"];

  return (
    <main className="min-h-screen pt-24 md:pt-28 bg-brand-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-brand-gray-400 hover:text-brand-black transition-colors duration-200 mb-6">
            <ArrowLeft size={14} /> Back to cart
          </Link>
          <h1 className="font-display text-5xl md:text-6xl tracking-wider text-brand-black">
            CHECKOUT
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-12">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <button
                onClick={() => i + 1 < step && setStep(i + 1)}
                className={`flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${
                  step === i + 1
                    ? "text-brand-black font-bold"
                    : step > i + 1
                      ? "text-brand-gray-500 cursor-pointer"
                      : "text-brand-gray-300"
                }`}
              >
                <span className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold rounded-full ${
                  step === i + 1
                    ? "bg-brand-black text-brand-white"
                    : step > i + 1
                      ? "bg-brand-gray-300 text-brand-black"
                      : "bg-brand-gray-100 text-brand-gray-400"
                }`}>
                  {step > i + 1 ? "✓" : i + 1}
                </span>
                {label}
              </button>
              {i < stepLabels.length - 1 && (
                <div className={`w-12 h-px mx-2 ${step > i + 1 ? "bg-brand-gray-300" : "bg-brand-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleNextStep}>
              {/* Step 1: Contact & Shipping Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-mono text-xs tracking-widest uppercase text-brand-gray-500 mb-4">
                      Contact Information
                    </h2>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      required
                      className="w-full border border-brand-gray-300 px-4 py-3.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <h2 className="font-mono text-xs tracking-widest uppercase text-brand-gray-500 mb-4">
                      Shipping Address
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        required
                        className="border border-brand-gray-300 px-4 py-3.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-200"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        required
                        className="border border-brand-gray-300 px-4 py-3.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-200"
                      />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Address"
                      required
                      className="w-full mt-3 border border-brand-gray-300 px-4 py-3.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-200"
                    />
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      placeholder="Apartment, suite, etc. (optional)"
                      className="w-full mt-3 border border-brand-gray-300 px-4 py-3.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-200"
                    />
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        required
                        className="border border-brand-gray-300 px-4 py-3.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-200"
                      />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="border border-brand-gray-300 px-4 py-3.5 text-brand-black font-body text-sm outline-none focus:border-brand-black transition-colors duration-200 bg-brand-white cursor-pointer"
                      >
                        <option value="Egypt">Egypt</option>
                        <option value="UAE">UAE</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Jordan">Jordan</option>
                      </select>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="ZIP code"
                        className="border border-brand-gray-300 px-4 py-3.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-200"
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      required
                      className="w-full mt-3 border border-brand-gray-300 px-4 py-3.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-200"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    Continue to Shipping
                  </button>
                </div>
              )}

              {/* Step 2: Shipping Method */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="font-mono text-xs tracking-widest uppercase text-brand-gray-500 mb-4">
                    Shipping Method
                  </h2>

                  {/* Shipping address summary */}
                  <div className="border border-brand-gray-200 p-4 bg-brand-gray-50">
                    <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-400 mb-2">Ship to</p>
                    <p className="font-body text-sm text-brand-black">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}{formData.apartment ? `, ${formData.apartment}` : ""}<br />
                      {formData.city}, {formData.country} {formData.zipCode}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className={`flex items-center justify-between p-4 border cursor-pointer transition-all duration-200 ${
                      formData.shippingMethod === "standard" ? "border-brand-black bg-brand-gray-50" : "border-brand-gray-200 hover:border-brand-gray-400"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          formData.shippingMethod === "standard" ? "border-brand-black" : "border-brand-gray-300"
                        }`}>
                          {formData.shippingMethod === "standard" && <div className="w-2 h-2 rounded-full bg-brand-black" />}
                        </div>
                        <div>
                          <p className="font-body text-sm text-brand-black font-medium">Standard Shipping</p>
                          <p className="font-mono text-xs text-brand-gray-400 tracking-wider">5-7 business days</p>
                        </div>
                      </div>
                      <span className="font-mono text-sm text-brand-black">
                        {cartTotal >= 150 ? <span className="text-brand-gray-400">FREE</span> : "$9.99"}
                      </span>
                      <input type="radio" name="shippingMethod" value="standard" checked={formData.shippingMethod === "standard"} onChange={handleChange} className="hidden" />
                    </label>

                    <label className={`flex items-center justify-between p-4 border cursor-pointer transition-all duration-200 ${
                      formData.shippingMethod === "express" ? "border-brand-black bg-brand-gray-50" : "border-brand-gray-200 hover:border-brand-gray-400"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          formData.shippingMethod === "express" ? "border-brand-black" : "border-brand-gray-300"
                        }`}>
                          {formData.shippingMethod === "express" && <div className="w-2 h-2 rounded-full bg-brand-black" />}
                        </div>
                        <div>
                          <p className="font-body text-sm text-brand-black font-medium">Express Shipping</p>
                          <p className="font-mono text-xs text-brand-gray-400 tracking-wider">2-3 business days</p>
                        </div>
                      </div>
                      <span className="font-mono text-sm text-brand-black">$19.99</span>
                      <input type="radio" name="shippingMethod" value="express" checked={formData.shippingMethod === "express"} onChange={handleChange} className="hidden" />
                    </label>
                  </div>

                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="font-mono text-xs tracking-widest uppercase text-brand-gray-500 mb-4">
                    Payment
                  </h2>

                  <div className="border border-brand-gray-200 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard size={18} className="text-brand-gray-400" />
                      <p className="font-mono text-xs tracking-widest uppercase text-brand-gray-500">Credit Card</p>
                    </div>

                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="Card number"
                      required
                      className="w-full border border-brand-gray-300 px-4 py-3.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-200 mb-3"
                    />
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="Name on card"
                      required
                      className="w-full border border-brand-gray-300 px-4 py-3.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-200 mb-3"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM / YY"
                        required
                        className="border border-brand-gray-300 px-4 py-3.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-200"
                      />
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="CVV"
                        required
                        className="border border-brand-gray-300 px-4 py-3.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    <Lock size={14} />
                    Place Order — ${total.toFixed(2)}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-brand-gray-400">
                    <Lock size={12} />
                    <p className="font-mono text-xs tracking-wider">Secure checkout powered by Stripe</p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="border border-brand-gray-200 p-6 sticky top-28 bg-brand-gray-50">
              <h2 className="font-mono text-xs tracking-widest uppercase text-brand-gray-500 mb-4">
                Order Summary
              </h2>

              <div className="divide-y divide-brand-gray-200">
                {cart.items.map((item) => (
                  <CheckoutItem key={`${item.id}-${item.selectedSize}`} item={item} />
                ))}
              </div>

              {/* Promo Code */}
              <div className="flex mt-4 mb-4 gap-0">
                <input
                  type="text"
                  placeholder="Discount code"
                  className="flex-1 bg-brand-white border border-brand-gray-300 px-4 py-2.5 text-brand-black placeholder-brand-gray-400 font-body text-sm outline-none focus:border-brand-black transition-colors duration-200"
                />
                <button className="bg-brand-gray-300 hover:bg-brand-gray-400 text-brand-black font-mono text-xs tracking-widest uppercase px-4 py-2.5 transition-colors duration-300">
                  Apply
                </button>
              </div>

              <div className="border-t border-brand-gray-200 pt-4 space-y-3">
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
                <div className="flex justify-between border-t border-brand-gray-200 pt-4">
                  <span className="font-mono text-xs tracking-widest uppercase text-brand-gray-500">Total</span>
                  <span className="font-mono text-xl text-brand-black font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-brand-gray-200">
                <div className="flex items-center gap-1.5 text-brand-gray-400">
                  <Truck size={14} />
                  <span className="font-mono text-[10px] tracking-wider uppercase">Free Shipping $150+</span>
                </div>
                <div className="flex items-center gap-1.5 text-brand-gray-400">
                  <Lock size={14} />
                  <span className="font-mono text-[10px] tracking-wider uppercase">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
