import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs || faqs.length === 0) {
    return (
      <section className="py-16 px-6 md:px-16 bg-[#050505] text-white text-center">
        <h4 className="text-2xl font-serif mb-6">Frequently Asked</h4>
        <p className="text-slate-400">No FAQs available yet.</p>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#0b0b0b]  via-[#060606] to-black text-white">
      <div className="max-w-4xl mx-auto">
        <h4 className="text-3xl font-serif mb-10 text-center text-white/90">
          Frequently Asked Questions
        </h4>

        <div className="space-y-4">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={i}
                className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex justify-between items-center text-left px-6 py-4 focus:outline-none"
                >
                  <h5 className="text-lg font-medium text-white/90">
                    {item.q}
                  </h5>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-yellow-400 text-xl font-bold"
                  >
                    +
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="px-6 pb-4 text-slate-300 text-sm leading-relaxed"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
