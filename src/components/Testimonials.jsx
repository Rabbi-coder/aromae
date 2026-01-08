import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Elena Duarte",
    title: "Luxury Perfume Collector",
    text: "Aromaé fragrances redefined how I perceive elegance. Each note dances with emotion — it’s pure artistry.",
  },
  {
    id: 2,
    name: "Marcus Lemaire",
    title: "Fashion Director, Paris",
    text: "The first breath of Noir Essence felt like velvet and mystery — a cinematic masterpiece bottled.",
  },
  {
    id: 3,
    name: "Sophia Bennett",
    title: "Creative Entrepreneur",
    text: "Every spray tells a story. Aromaé has become my daily ritual — a touch of sophistication in motion.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 6 s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const active = testimonials[index];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#111] text-white px-6">
      {/* floating shimmer background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08)_0%,transparent_0%)] blur-3xl"></div>
        <div className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-yellow-400/10 rounded-full blur-[200px]"></div>
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 text-4xl md:text-5xl font-serif text-white/90 mb-12 flex items-center gap-3"
      >
        <Sparkles className="w-7 h-7 text-yellow-400" />
        Voices of Aromaé
      </motion.h2>

      {/* Glass container */}
      <div className="relative z-10 w-full max-w-4xl flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.97 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)] px-8 py-12 text-center overflow-hidden"
          >
            {/* subtle floating sparkles */}
            <div className="absolute inset-0 bg-[url('/src/assets/noise.png')] opacity-[0.03] pointer-events-none"></div>
            <p className="text-lg md:text-2xl text-slate-200 italic mb-8 leading-relaxed tracking-wide">
              “{active.text}”
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-2xl font-semibold text-white/90">
                {active.name}
              </h4>
              <p className="text-sm text-slate-400 mt-1">{active.title}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="relative z-10 flex gap-3 mt-10">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index
                ? "bg-yellow-400 scale-125 shadow-[0_0_8px_rgba(255,215,0,0.8)]"
                : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
