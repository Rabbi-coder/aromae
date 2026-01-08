import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function PerfumeCard({
  id,
  image,
  name,
  price,
  notes,
  onStoryClick,
}) {
  const { addToCart } = useCart();

  return (
    <motion.article
      whileHover={{ scale: 1.03, y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative w-full max-w-sm bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
    >
      {/* Image */}
      <div className="h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="p-6 text-center">
        <h3 className="text-2xl font-serif text-white">{name}</h3>

        {/* PRICE */}
        <p className="text-yellow-400 font-semibold mt-1 mb-2">{price}</p>

        <p className="text-sm text-slate-400 italic mb-4">{notes}</p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() =>
              addToCart({
                id,
                name,
                price: Number(String(price).replace("$", "")),
                image,
              })
            }
            className="px-5 py-2 rounded-full bg-yellow-400 text-black text-sm font-semibold hover:bg-yellow-300 transition cursor-pointer"
          >
            Add to Cart
          </button>

          <button
            onClick={() => onStoryClick?.({ image, name, notes, price })}
            className="px-5 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition cursor-pointer"
          >
            Story
          </button>
        </div>
      </div>
    </motion.article>
  );
}
