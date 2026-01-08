import { motion } from "framer-motion";
import bannerVideo from "../assets/bannervideo.mp4";
import BrandStory from "../components/BrandStory";
import Testimonials from "../components/Testimonials";
import AreomeHighlights from "../components/AromaeHighlights";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        >
          <source src={bannerVideo} type="video/mp4" />
        </video>

        {/* Overlay for slight dark effect */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-white px-4"
        >
          <h1 className="text-6xl md:text-7xl font-serif mb-4 tracking-wide">
            Aromaé
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-6">
            Luxury Fragrance Redefined
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-yellow-500 text-black font-medium rounded-full hover:bg-yellow-400 transition cursor-pointer"
            onClick={() => navigate("/shop")}
          >
            Explore
          </motion.button>
        </motion.div>
      </section>
      <AreomeHighlights />
      <BrandStory />
      <Testimonials />
    </>
  );
}
