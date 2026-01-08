import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const branches = [
  {
    name: "Dhanmondi Branch",
    address: "Road 27, Dhaka",
    phone: "+8801711000000",
    lat: 23.7461,
    lng: 90.3742,
  },
  {
    name: "Gulshan Branch",
    address: "Circle 1, Dhaka",
    phone: "+8801811000000",
    lat: 23.7925,
    lng: 90.4078,
  },
  {
    name: "Banani Branch",
    address: "Block C, Dhaka",
    phone: "+8801911000000",
    lat: 23.7933,
    lng: 90.4002,
  },
  {
    name: "Uttara Branch",
    address: "Sector 7, Dhaka",
    phone: "+8801511000000",
    lat: 23.8765,
    lng: 90.3949,
  },
  {
    name: "Mirpur Branch",
    address: "Mirpur-10, Dhaka",
    phone: "+8801611000000",
    lat: 23.8103,
    lng: 90.3535,
  },
  {
    name: "Bashundhara Branch",
    address: "R/A, Dhaka",
    phone: "+8801712000000",
    lat: 23.8156,
    lng: 90.4641,
  },
  {
    name: "Motijheel Branch",
    address: "Commercial Area",
    phone: "+8801812000000",
    lat: 23.7324,
    lng: 90.417,
  },
  {
    name: "Wari Branch",
    address: "Tipu Sultan Rd",
    phone: "+8801912000000",
    lat: 23.7113,
    lng: 90.4218,
  },
  {
    name: "Farmgate Branch",
    address: "Kazi Nazrul Islam Ave",
    phone: "+8801512000000",
    lat: 23.757,
    lng: 90.3895,
  },
];

export default function BranchesD() {
  const [active, setActive] = useState(null);

  const popupRef = useRef(null);

  //outside click handler for branch popup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth >= 1024) {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
          setActive(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-black via-[#060606] to-[#0b0b0b] px-6 py-5 relative">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-serif font-semibold text-white mb-10 tracking-wide text-center"
      >
        We Are Near <span className="text-yellow-400">You</span>
      </motion.h1>
      {/* Branches Grid */}
      <div className="relative w-full max-w-6xl flex flex-col md:flex-row gap-10">
        <div className="relative flex-1 flex flex-wrap gap-6 md:gap-8 justify-center md:justify-start">
          {branches.map((b, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07 }}
              onClick={() => setActive(b)}
              className="cursor-pointer px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-sm md:text-base font-medium shadow-lg transition-all flex items-center justify-center whitespace-nowrap"
            >
              {b.name}
            </motion.div>
          ))}
        </div>
        {/* Branch Popup */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xl flex justify-center items-center z-50 px-4"
            >
              <motion.div
                ref={popupRef}
                className="bg-white/5 rounded-3xl border border-white/20 p-8 md:p-12 max-w-lg w-full text-white flex flex-col items-center gap-6 relative shadow-xl"
              >
                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-6 text-2xl text-white hover:text-yellow-400"
                >
                  ✕
                </button>

                <h2 className="text-2xl md:text-4xl font-bold text-center">
                  {active.name}
                </h2>

                <p className="text-lg opacity-80 text-center">
                  📍 {active.address}
                </p>

                <p className="text-lg opacity-80">📞 {active.phone}</p>

                {/* BUTTONS */}
                <div className="flex gap-4 mt-3">
                  {/* CALL BUTTON */}
                  <a
                    href={`tel:${active.phone}`}
                    className="px-5 py-2 rounded-xl bg-white text-black font-semibold"
                  >
                    Call Now
                  </a>

                  {/* MAP BUTTON */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${active.lat},${active.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-xl bg-white/10 border border-white"
                  >
                    View in Maps
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
