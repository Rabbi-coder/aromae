import { motion, AnimatePresence } from "framer-motion";
import ModalPortal from "./ModalPortal";

export default function DetailsModal({ isOpen, onClose, perfume }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalPortal>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative w-[90%] md:w-[600px] bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl text-white backdrop-blur-xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-white/60 hover:text-white transition"
              >
                ✕
              </button>

              {/* Perfume Image */}
              <img
                src={perfume.image}
                alt={perfume.name}
                className="w-40 h-40 object-cover rounded-xl mx-auto mb-4 border border-white/20 shadow-lg"
              />

              {/* Title */}
              <h2 className="text-2xl font-serif mb-2">{perfume.name}</h2>

              {/* Description */}
              <p className="text-sm text-white/70 mb-4">{perfume.story}</p>

              {/* Notes Section */}
              <div className="space-y-1 text-sm text-white/80">
                <p>
                  <span className="font-semibold text-white/90">
                    Top Notes:
                  </span>{" "}
                  {perfume.notes.top}
                </p>
                <p>
                  <span className="font-semibold text-white/90">
                    Heart Notes:
                  </span>{" "}
                  {perfume.notes.middle}
                </p>
                <p>
                  <span className="font-semibold text-white/90">
                    Base Notes:
                  </span>{" "}
                  {perfume.notes.base}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}
