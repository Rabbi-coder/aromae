import { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function Checkout() {
  const { cart, subtotal } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-300">
        Your cart is empty.
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-3xl max-w-md"
        >
          <h2 className="text-3xl font-serif text-yellow-400 mb-4">
            Order Confirmed ✨
          </h2>
          <p className="text-slate-300 mb-6">
            Thank you {form.name}. Your fragrance is on the way.
          </p>
          <p className="text-white font-semibold">
            Total: ${subtotal.toFixed(2)}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-28 px-6 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* 🧾 Cart Summary */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-xl font-serif mb-6">Your Order</h3>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-3 text-sm">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}

          <div className="border-t border-white/10 mt-4 pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* 🧑 User Form */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-xl font-serif mb-6">Shipping Details</h3>

          <div className="space-y-4">
            {["name", "email", "phone", "address"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.toUpperCase()}
                value={form[field]}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full mt-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
