import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { addToCart, getCart, removeCartItem, updateCartItem } from "../services/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadCart = async () => {
    if (!localStorage.getItem("token")) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const items = await getCart();
      setCartItems(items);
    } catch (error) {
      if (error.response?.status === 401) {
        setCartItems([]);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadCart();
  }, [user]);

  const handleAddToCart = async (productId, quantity) => {
    const item = await addToCart(productId, quantity);
    const existing = cartItems.find((cartItem) => cartItem.productId._id === item.productId._id);

    if (existing) {
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.productId._id === item.productId._id
            ? { ...cartItem, quantity: item.quantity }
            : cartItem
        )
      );
    } else {
      setCartItems((prev) => [...prev, item]);
    }
  };

  const handleRemoveFromCart = async (id) => {
    await removeCartItem(id);
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    await updateCartItem(cartItemId, quantity);
    await loadCart();
  };

  const summary = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => {
      const price = item.productId.discountPrice || item.productId.price;
      return acc + price * item.quantity;
    }, 0);
    const discount = cartItems.reduce((acc, item) => {
      const diff = (item.productId.price - (item.productId.discountPrice || item.productId.price)) * item.quantity;
      return acc + Math.max(0, diff);
    }, 0);
    const deliveryFee = subtotal > 200 || subtotal === 0 ? 0 : 15;
    const total = subtotal + deliveryFee;

    return {
      subtotal,
      discount,
      deliveryFee,
      total,
      itemCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
    };
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateQuantity: handleUpdateQuantity,
        summary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
