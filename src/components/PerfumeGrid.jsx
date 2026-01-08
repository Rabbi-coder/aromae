import { AnimatePresence, motion } from "framer-motion";
import PerfumeCard from "./PerfumeCard";

export default function ProductGrid({ items = [], onStoryClick }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
        <AnimatePresence mode="popLayout">
          {items.map((p) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className=" w-full"
            >
              <PerfumeCard
                image={p.image}
                name={p.name}
                price={p.price}
                note={p.note}
                onStoryClick={onStoryClick}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
