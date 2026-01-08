import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiOutlineShoppingBag } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const { user, logout } = useAuth();

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif tracking-wide text-white">
            Aromaé
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Shop", "About"].map((item) => (
              <NavLink
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-wider transition ${
                    isActive
                      ? "text-yellow-400"
                      : "text-slate-200 hover:text-white"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}

            {user ? (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-full bg-white/10 text-white text-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-yellow-400 text-black text-sm font-semibold"
              >
                Sign In
              </Link>
            )}

            {/* Desktop Cart */}
            <button onClick={() => setCartOpen(true)} className="relative">
              <HiOutlineShoppingBag className="text-white text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 border-t border-white/10"
            >
              <div className="flex flex-col items-center py-6 gap-4">
                {["Home", "Shop", "About"].map((item) => (
                  <NavLink
                    key={item}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="text-base text-slate-200 hover:text-yellow-400"
                  >
                    {item}
                  </NavLink>
                ))}
                {user ? (
                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-full bg-white/10 text-white text-sm"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-full bg-yellow-400 text-black text-sm font-semibold"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== Floating Glass Cart Button (All Devices) ===== */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-xl border border-white/20 text-white p-4 rounded-full shadow-2xl hover:bg-white/20 transition"
      >
        <HiOutlineShoppingBag className="text-2xl cursor-pointer" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* ================= CART DRAWER ================= */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
