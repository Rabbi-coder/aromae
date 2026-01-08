import { useState, useMemo } from "react";
import ProductGrid from "../components/PerfumeGrid";
import FilterBox from "../components/FilterBox";
import StoryModal from "../components/StoryModal";

// Import your images so Vite can find them after building
import perfume1 from "../assets/perfume1.jpg";
import perfume2 from "../assets/perfume2.jpg";
import perfume3 from "../assets/perfume3.jpg";
import perfume4 from "../assets/perfume4.jpg";
import perfume5 from "../assets/perfume5.jpg";

const PRODUCTS = [
  {
    id: 1,
    image: perfume1,
    name: "Noir Essence",
    price: "$120",
    notes: "Woody • Amber • Leather",
    categories: ["Signature", "Woody"],
  },
  {
    id: 2,
    image: perfume2,
    name: "Gold Reverie",
    price: "$140",
    notes: "Citrus • Jasmine • Oud",
    categories: ["Signature", "Citrus"],
  },
  {
    id: 3,
    image: perfume3,
    name: "Velvet Mist",
    price: "$110",
    notes: "Floral • Musk • Vanilla",
    categories: ["Floral"],
  },
  {
    id: 4,
    image: perfume4,
    name: "Azure Dream",
    price: "$130",
    notes: "Aquatic • Green • Sandalwood",
    categories: ["Citrus", "Woody"],
  },
  {
    id: 5,
    image: perfume5,
    name: "Crimson Bloom",
    price: "$125",
    notes: "Rose • Patchouli • Amber",
    categories: ["Floral", "Signature"],
  },
  {
    id: 6,
    image: perfume1,
    name: "Noir Essence",
    price: "$120",
    notes: "Woody • Amber • Leather",
    categories: ["Signature", "Woody"],
  },
];

const FILTER_OPTIONS = ["All", "Signature", "Floral", "Woody", "Citrus"];

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  //memorized filtered products

  const filtered = useMemo(() => {
    if (activeFilter === "All") return PRODUCTS;
    return PRODUCTS.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#060606] to-[#0b0b0b] relative">
      <div className="pt-24 pb-8 text-center">
        <h2 className="text-4xl font-serif text-white mb-2">The Collection</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Explore our curated selection of fragrances — crafted for timeless
          elegance.
        </p>
      </div>
      {/* Filter Bar */}
      <FilterBox
        options={FILTER_OPTIONS}
        active={activeFilter}
        onChange={(opt) => setActiveFilter(opt)}
      />
      <div className="text-center text-sm text-slate-400 mb-4">
        Showing <span className="text-white">{filtered.length}</span> items for
        “<span className="text-yellow-400">{activeFilter}</span>”
      </div>

      {/* Product Grid (filtered) */}
      <ProductGrid
        items={filtered}
        onStoryClick={(p) => setSelectedPerfume(p)}
      />

      {/* Story Modal (if using) */}
      {selectedPerfume && (
        <StoryModal
          show={!!selectedPerfume}
          perfume={selectedPerfume}
          onClose={() => setSelectedPerfume(null)}
        />
      )}
    </main>
  );
}
