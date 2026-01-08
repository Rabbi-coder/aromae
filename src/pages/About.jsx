import AboutWrap from "../components/AboutWrap";
import FAQGrid from "../components/FAQGrid";
import MapTrail from "../components/MapTrail";
import Contact from "../components/Contact";
import Email from "../components/Email";

const SAMPLE_FAQS = [
  {
    q: "How long do Aromaé scents last?",
    a: "Most last 8–12 hours depending on skin chemistry.",
  },
  {
    q: "Are Aromaé products cruelty-free?",
    a: "Yes, we never test on animals and source ethically.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes — shipping options vary by region.",
  },
];

export default function About() {
  return (
    <>
      <AboutWrap />
      <Contact />
      <FAQGrid faqs={SAMPLE_FAQS} />
      <MapTrail />
      <Email />
    </>
  );
}
