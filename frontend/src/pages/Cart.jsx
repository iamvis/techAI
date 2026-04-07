import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import CartItem from "../components/CartItem";
import Footer from "../components/Footer";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, loading, removeFromCart, summary, updateQuantity } = useCart();
  const toast = useToast();

  const handleQuantityChange = async (itemId, quantity) => {
    await updateQuantity(itemId, quantity);
    toast.addToast({ message: "Cart updated successfully." });
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
    toast.addToast({ message: "Item removed from cart." });
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Cart</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Your shopping bag</h1>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Loading cart items...
        </div>
      ) : cartItems.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Your cart is empty.
        </div>
      ) : (
        <div className="grid gap-10 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Order Summary</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${summary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Discount</span>
                <span>-${summary.discount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery fee</span>
                <span>${summary.deliveryFee.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xl font-semibold text-slate-900">
              <span>Total</span>
              <span>${summary.total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-8 w-full rounded-3xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
      <Footer />
    </main>
  );
};

export default Cart;
