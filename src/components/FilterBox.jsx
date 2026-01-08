import { motion } from "framer-motion";

export default function FilerBox({ options = [], active, onChange }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-6 flex flex-wrap gap-3 justify-center">
      {options.map((opt) => (
        <motion.button
          key={opt}
          onClick={() => onChange(opt)}
          whileTap={{ scale: 0.98 }}
          animate={opt === active ? { scale: 1.06 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
                        ${opt === active ? "text-yellow-400" : "text-white/70"}
                        ${
                          opt === active
                            ? "bg-white/5"
                            : "bg-white/3 hover:bg-white/6"
                        } `}
          aria-pressed={opt === active}
        >
          {opt}
        </motion.button>
      ))}
    </div>
  );
}
