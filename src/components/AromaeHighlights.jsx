import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

/* ----------------------
   Sample data
   ---------------------- */
const SAMPLE_PERFUMES = [
  {
    id: 1,
    slug: "oud-royale",
    name: "Oud Royale",
    price: 149,
    image: "src/assets/oud-royale.png",
    notes: {
      top: "Saffron, Bergamot",
      middle: "Agarwood (Oud), Damask Rose",
      base: "Amber, Leather, Musk",
    },
    description:
      "Oud Royale is our signature blockbuster — an opulent, resinous oud heart wrapped in saffron and rose that lingers like a memory.",
  },
  {
    id: 2,
    slug: "citrus-bloom",
    name: "Citrus Bloom",
    price: 119,
    image: "src/assets/citrus-bloom.png",
    notes: {
      top: "Bergamot, Lemon Zest",
      middle: "Neroli, Jasmine",
      base: "Cedarwood, White Musk",
    },
    description:
      "Citrus Bloom shines with luminous freshness — a joyous blend of bergamot and lemon zest rippling into neroli and jasmine.",
  },
  {
    id: 3,
    slug: "velvet-mist",
    name: "Velvet Mist",
    price: 129,
    image: "src/assets/velvet-mist.png",
    notes: {
      top: "Pink Pepper, Pear",
      middle: "Tuberose, Cashmere Wood",
      base: "Vanilla, Sandalwood",
    },
    description:
      "Velvet Mist pairs creamy florals with soft, velvety woods and a gourmand whisper of vanilla.",
  },
  {
    id: 4,
    slug: "amber-essence",
    name: "Amber Essence",
    price: 139,
    image: "src/assets/amber-essence.png",
    notes: {
      top: "Bergamot, Saffron",
      middle: "Amber, Leather",
      base: "Musk, Cedarwood",
    },
    description:
      "Amber Essence radiates timeless luxury — golden amber and soft leather melt into musk and cedarwood.",
  },
  {
    id: 5,
    slug: "floral-symphony",
    name: "Floral Symphony",
    price: 129,
    image: "src/assets/floral-symphony.png",
    notes: {
      top: "Peony, Freesia",
      middle: "Rose, Jasmine",
      base: "Musk, Amber",
    },
    description:
      "Floral Symphony is a symphony of floral bliss — a delicate blend of peony and freesia, rose and jasmine, musk and amber.",
  },
  {
    id: 6,
    slug: "woody-allure",
    name: "Woody Allure",
    price: 149,
    image: "src/assets/woody-allure.png",
    notes: {
      top: "Grapefruit, Black Pepper",
      middle: "Vetiver, Cedarwood",
      base: "Patchouli, Ambergris",
    },
    description:
      "Woody Allure is a woody allure — a captivating blend of grapefruit and black pepper, vetiver and cedarwood, patchouli and ambergris.",
  },
  {
    id: 7,
    slug: "sandalwood-sensation",
    name: "Sandalwood Sensation",
    price: 129,
    image: "src/assets/sandalwood-sensation.png",
    notes: {
      top: "Peony, Freesia",
      middle: "Rose, Jasmine",
      base: "Musk, Amber",
    },
    description:
      "Sandalwood Sensation is a sandalwood sensation — a captivating blend of peony and freesia, rose and jasmine, musk and amber.",
  },
];

function NoteBadge({ label }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-200">
      {label}
    </span>
  );
}

/* ----------------------
   Perfume Tile (with smoother hover)
   ---------------------- */
function PerfumeTile({ item, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(item)}
      className="relative w-36 md:w-44 h-64 md:h-72 flex flex-col items-center justify-end cursor-pointer flex-shrink-0"
      whileTap={{ scale: 0.95 }}
    >
      {/* Bottle */}
      <motion.img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      />

      {/* Name + arrow */}
      <motion.div
        animate={{ y: hovered ? -10 : 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
        }}
        className="absolute bottom-2 text-center"
      >
        <h4 className="text-sm md:text-base font-light tracking-wide text-white/90">
          {item.name}
        </h4>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="text-yellow-400 text-lg"
            >
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: "easeInOut",
                }}
              >
                ↓
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ----------------------
   Main Component
   ---------------------- */
export default function AromaeHighlights({ items = SAMPLE_PERFUMES }) {
  const { addToCart } = useCart();
  const [selected, setSelected] = useState(null);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef(null);

  // Continuous slide (smooth ticker style)
  useEffect(() => {
    let animationFrame;
    const speed = 0.5; // speed of slide
    const animate = () => {
      setOffset((prev) =>
        prev - speed < -items.length * 180 ? 0 : prev - speed
      ); // 180px ~ card width + gap
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [items]);

  const handleSelect = (item) =>
    setSelected((prev) => (prev?.id === item.id ? null : item));

  return (
    <section className="py-24 bg-[#050505] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-serif mb-3 text-white">
            Aromaé Highlights
          </h3>
          <p className="text-slate-400">
            Our iconic perfumes that define modern luxury.
          </p>
        </div>

        {/* Continuous Slider */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden py-6"
        >
          <motion.div
            className="flex gap-10"
            style={{
              transform: `translateX(${offset}px)`,
              transition: "transform 0s linear",
            }}
          >
            {[...items, ...items].map((it, i) => (
              <PerfumeTile
                key={`${it.id}-${i}`}
                item={it}
                onClick={handleSelect}
              />
            ))}
          </motion.div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.6 }}
              className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-14 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white text-2xl hover:text-yellow-400"
              >
                ×
              </button>

              <motion.img
                src={selected.image}
                alt={selected.name}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-h-96 object-contain"
              />

              <div>
                <h4 className="text-2xl font-serif mb-3">{selected.name}</h4>
                <div className="text-yellow-400 text-lg font-semibold mb-4">
                  {selected.price}
                </div>
                <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                  {selected.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Top</div>
                    <NoteBadge label={selected.notes.top} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Middle</div>
                    <NoteBadge label={selected.notes.middle} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Base</div>
                    <NoteBadge label={selected.notes.base} />
                  </div>
                </div>

                <button
                  onClick={() =>
                    addToCart({
                      id: selected.id,
                      name: selected.name,
                      price: selected.price,
                      image: selected.image,
                    })
                  }
                  className="mt-4 px-5 py-2 rounded-full bg-yellow-400 text-black text-sm font-semibold hover:bg-yellow-300 transition cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
