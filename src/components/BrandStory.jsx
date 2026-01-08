import { motion } from "framer-motion";
import perfumeStory from "../assets/perfumeStory.jpg";

export default function BrandStory() {
  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] flex flex-col md:flex-row items-center justify-center px-8 py-24 overflow-hidden">
        {/* Left: Perfume Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0"
        >
          <div className="relative">
            <img
              src={perfumeStory}
              alt="Aromaé essence"
              className="w-[340px] md:w-[420px] rounded-3xl shadow-[0_0_60px_rgba(255,215,0,0.1)] object-cover"
            />
            {/* golden blur light behind bottle */}
            <div className="absolute inset-0 blur-3xl bg-yellow-500/10 rounded-3xl"></div>
          </div>
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-center md:text-left z-10"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            The Essence Behind <span className="text-yellow-400">Aromaé</span>
          </h2>
          <p className="text-slate-300 leading-relaxed mb-6 max-w-lg mx-auto md:mx-0">
            Every drop of Aromaé is born from an unshakable passion — blending
            the rarest ingredients with timeless artistry. Crafted in silence,
            designed for those who carry presence without words.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            viewport={{ once: true }}
            className="italic text-yellow-500 text-lg font-serif"
          >
            — The Founder
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
