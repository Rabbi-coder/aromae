import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = () => {
    if (!form.email || !form.password) return;
    login({ email: form.email });
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden">
      {/* ambient glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-yellow-400 tracking-wide">
            Aromaé
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Enter the world of fine fragrance
          </p>
        </div>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-yellow-400 transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-yellow-400 transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="w-full mt-8 py-3 rounded-xl bg-yellow-400 text-black font-semibold tracking-wide hover:bg-yellow-300 transition"
        >
          Enter Boutique
        </motion.button>

        <p className="text-center text-slate-500 text-xs mt-8">
          Luxury fragrances curated with passion
        </p>
      </motion.div>
    </div>
  );
}
