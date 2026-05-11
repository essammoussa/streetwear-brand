import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, User, ArrowRight, Package, UserCircle, Check } from "lucide-react";
import { useCart } from "../../context/CartContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/products" },
  { label: "About", path: "/#new-arrivals" },
  { label: "Contact", path: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [emailOptIn, setEmailOptIn] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  const accountRef = useRef(null);

  // Only the homepage has the full-screen hero — all other pages need a solid navbar
  const isHeroPage = location.pathname === "/";
  const showSolid = !isHeroPage || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close account modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showSolid
            ? "bg-brand-white/95 backdrop-blur-md border-b border-brand-gray-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-3 items-center h-16 md:h-20">
          
          {/* Desktop Nav (Left) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 justify-start">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-mono text-xs tracking-widest uppercase transition-colors duration-300 ${
                  showSolid
                    ? location.pathname === link.path
                      ? "text-brand-black"
                      : "text-brand-gray-400 hover:text-brand-black"
                    : location.pathname === link.path
                      ? "text-brand-white"
                      : "text-brand-white/60 hover:text-brand-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo (Center on Desktop, Left on Mobile) */}
          <Link
            to="/"
            className={`font-display text-2xl md:text-3xl tracking-wider transition-colors duration-300 md:justify-self-center ${
              showSolid ? "text-brand-black hover:text-brand-gray-600" : "text-brand-white hover:text-brand-gray-300"
            }`}
          >
            VOIDWEAR
          </Link>

          {/* Right Icons */}
          <div className="flex items-center justify-end gap-4 relative w-full md:justify-self-end" ref={accountRef}>
            <button className={`hidden md:flex transition-colors duration-300 ${
              showSolid ? "text-brand-gray-400 hover:text-brand-black" : "text-brand-white/60 hover:text-brand-white"
            }`}>
              <Search size={18} strokeWidth={1.5} />
            </button>
            
            <button 
              onClick={() => setAccountOpen(!accountOpen)}
              className={`hidden md:flex transition-colors duration-300 ${
                showSolid ? "text-brand-gray-400 hover:text-brand-black" : "text-brand-white/60 hover:text-brand-white"
              }`}
            >
              <User size={18} strokeWidth={1.5} />
            </button>

            {/* Account Modal */}
            {accountOpen && (
              <div className="absolute top-12 right-0 w-[360px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 z-50 animate-fade-in border border-brand-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-body font-bold text-[17px] text-brand-black">Sign in or create account</h3>
                  <button 
                    onClick={() => setAccountOpen(false)}
                    className="w-8 h-8 rounded-full border-2 border-brand-gray-400 flex items-center justify-center text-brand-gray-500 hover:bg-brand-gray-100 transition-colors"
                  >
                    <X size={16} strokeWidth={2} />
                  </button>
                </div>

                <button className="w-full bg-brand-black hover:bg-brand-gray-700 text-brand-white font-body font-semibold rounded-xl py-3.5 transition-colors duration-200 text-[15px] tracking-wide mb-6">
                  Sign in
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px bg-brand-gray-200 flex-1"></div>
                  <span className="font-body text-xs text-brand-gray-500 font-medium">OR</span>
                  <div className="h-px bg-brand-gray-200 flex-1"></div>
                </div>

                <div className="relative mb-4">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full border border-brand-gray-200 rounded-xl px-4 py-3.5 font-body text-[15px] placeholder-brand-gray-500 outline-none focus:border-brand-gray-400 transition-colors"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-400 hover:text-brand-black transition-colors">
                    <ArrowRight size={20} strokeWidth={1.5} />
                  </button>
                </div>

                <label className="flex items-center gap-3 mb-6 cursor-pointer group" onClick={(e) => e.preventDefault()}>
                  <div 
                    className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${
                      emailOptIn ? "bg-brand-black border-brand-black" : "border-brand-gray-300 group-hover:border-brand-gray-400"
                    }`}
                    onClick={() => setEmailOptIn(!emailOptIn)}
                  >
                    {emailOptIn && <Check size={14} strokeWidth={3} className="text-white" />}
                  </div>
                  <span className="font-body text-[14px] text-brand-black" onClick={() => setEmailOptIn(!emailOptIn)}>
                    Email me with news and offers
                  </span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 border border-brand-gray-200 rounded-xl py-3 hover:bg-brand-gray-50 transition-colors">
                    <Package size={18} strokeWidth={1.5} className="text-brand-black" />
                    <span className="font-body text-[14px] font-medium text-brand-black">Orders</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 border border-brand-gray-200 rounded-xl py-3 hover:bg-brand-gray-50 transition-colors">
                    <UserCircle size={18} strokeWidth={1.5} className="text-brand-black" />
                    <span className="font-body text-[14px] font-medium text-brand-black">Profile</span>
                  </button>
                </div>
              </div>
            )}

            <Link
              to="/cart"
              className={`relative transition-colors duration-300 ${
                showSolid ? "text-brand-gray-400 hover:text-brand-black" : "text-brand-white/60 hover:text-brand-white"
              }`}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-black text-brand-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden transition-colors duration-300 ml-2 ${
                showSolid ? "text-brand-gray-400 hover:text-brand-black" : "text-brand-white/60 hover:text-brand-white"
              }`}
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brand-white transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-center items-start h-full px-8 pt-20 gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-display text-5xl tracking-wider transition-all duration-300 ${
                menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              } ${location.pathname === link.path ? "text-brand-gray-400" : "text-brand-black"}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <button 
            onClick={() => { setMenuOpen(false); setAccountOpen(true); }}
            className="font-display text-5xl tracking-wider transition-all duration-300 opacity-100 text-brand-black"
          >
            Account
          </button>
          <Link
            to="/cart"
            className="font-mono text-sm tracking-widest text-brand-gray-400 uppercase mt-4"
          >
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </>
  );
}
