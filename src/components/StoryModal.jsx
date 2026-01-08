import { motion, AnimatePresence } from "framer-motion";

export default function StoryModal({ show, onClose, perfume }) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Background Blur Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Centered Glass Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 
                       bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl 
                       overflow-hidden text-white"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            {/* Perfume Image */}
            <div className="h-64 w-full overflow-hidden">
              <img
                src={perfume?.image}
                alt={`${perfume?.name} perfume`}
                className="h-full w-full object-cover opacity-80"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-3xl font-serif mb-3 text-center">
                {perfume?.name}
              </h2>
              <p className="text-sm text-slate-200 italic mb-5 text-center">
                {perfume?.notes}
              </p>

              {/* Perfume Story Section */}
              <div className="text-slate-300 leading-relaxed text-sm">
                <p>
                  Each drop of{" "}
                  <span className="text-white font-semibold">
                    {perfume?.name}
                  </span>
                  tells a story — crafted from rare essential oils, bottled
                  under moonlight, and wrapped in timeless elegance. Its aroma
                  unfolds like poetry on skin.
                </p>
                <p className="mt-3">
                  <span className="text-yellow-400 font-medium">Notes:</span>{" "}
                  Bergamot, Amber, Sandalwood, and hints of Smoked Vanilla.
                </p>
              </div>

              {/* Close Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 
                             text-white/90 font-medium backdrop-blur-sm transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
