import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

/**
 * ModalPortal ensures the modal renders outside the main app structure
 * (prevents layout breaks, z-index issues, and mismatched hydration in Vite/React).
 */

export default function ModalPortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This makes sure the portal only renders after the component mounts in the browser.
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return createPortal(children, document.body);
}
