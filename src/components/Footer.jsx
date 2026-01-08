import { motion, useAnimation, useInView } from "framer-motion";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isInView) {
      controls.start({ width: "100%" });
    }
  }, [isInView, controls]);
  return (
    <>
      <footer
        ref={ref}
        className="relative bg-[#050505] py-16 text-white overflow-hidden"
      >
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl font-serif text-yellow-400
                tracking-wide"
          >
            Aromaé
          </motion.h2>

          <p className="text-slate-400 text-sm md:text-base">
            Crafted for those who seek elegance beyond time.
          </p>

          <motion.div
            initial={{ width: 0 }}
            animate={controls}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent my-6"
          ></motion.div>

          <div className="flex justify-center space-x-6">
            <Instagram className="w-5 h-5 text-slate-400 hover:text-yellow-400" />
            <Facebook className="w-5 h-5 text-slate-400 hover:text-yellow-400 transition" />
            <Youtube className="w-5 h-5 text-slate-400 hover:text-yellow-400 transition" />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition"
            onClick={() => navigate("/shop")}
          >
            Discover Your Scent
          </motion.button>

          <p className="text-xs text-slate-500 mt-8">
            © 2025 Aromaé — The Essence of Luxury
          </p>
        </div>
      </footer>
    </>
  );
}
