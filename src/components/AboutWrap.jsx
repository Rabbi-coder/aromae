// AboutWrap.jsx
import { motion } from "framer-motion";

export default function AboutWrap() {
  return (
    <section className="relative bg-black text-white py-20 px-6 md:px-16 overflow-hidden">
      {/* subtle gold radial behind */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/6 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <h3 className="text-3xl md:text-4xl font-serif mb-4 tracking-wide">
          Crafted beyond time
        </h3>
        <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Our journey began with a single scent and an obsession for detail.
          Aromaé blends rare essences with patient craft — creating fragrances
          that linger like memories.
        </p>

        <div className="w-24 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent mx-auto mt-8 rounded" />
      </motion.div>
    </section>
  );
}
