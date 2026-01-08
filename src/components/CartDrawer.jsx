import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ open, onClose }) {
  const { cart, updateQty, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0b0b0b] z-50 border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h3 className="text-xl font-serif text-white">Your Cart</h3>
              <button onClick={onClose} className="text-white text-xl">
                <HiX />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 && (
                <p className="text-slate-400 text-center mt-20">
                  Your cart is empty.
                </p>
              )}

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-center bg-white/5 p-3 rounded-xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h4 className="text-white text-sm">{item.name}</h4>
                    <p className="text-slate-400 text-xs">${item.price}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="p-1 bg-white/10 rounded cursor-pointer"
                      >
                        <HiMinus />
                      </button>
                      <span className="text-white text-sm">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="p-1 bg-white/10 rounded cursor-pointer"
                      >
                        <HiPlus />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 cursor-pointer"
                  >
                    <HiTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 px-6 py-5">
              <div className="flex justify-between text-white mb-4">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
                className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 cursor-pointer"
              >
                Checkout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
