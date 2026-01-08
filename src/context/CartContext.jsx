// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("aromae-cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("aromae-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const safeId = product.id ?? product.name;

    setCart((prev) => {
      const exist = prev.find((item) => item.id === safeId);

      if (exist) {
        return prev.map((item) =>
          item.id === safeId ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...product, id: safeId, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
