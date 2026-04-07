import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { summary, cartItems, loading: cartLoading } = useCart();

  const memberSince = useMemo(() => {
    if (!user?.createdAt) return "Unknown";
    return new Date(user.createdAt).toLocaleDateString();
  }, [user]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value || 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="rounded-4xl overflow-hidden shadow-2xl bg-linear-to-r from-slate-900 via-indigo-700 to-cyan-600 text-white p-10 sm:p-14 mb-10">
          <div className="grid gap-8 justify-items-center text-center lg:grid-cols-[1.4fr_1fr] lg:justify-items-stretch lg:text-left items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-200 mb-4">My account dashboard</p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
                Welcome back, {user?.name ?? "Valued Shopper"}.
              </h1>
              <p className="max-w-xl text-slate-100/90 leading-7">
                Manage your profile, review your current cart, and jump straight into shopping. Your account area keeps your essentials within one clean space.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-xl border border-white/10">
                <p className="text-sm text-slate-200 uppercase tracking-[0.18em] mb-2">Cart value</p>
                <p className="text-3xl font-semibold">{formatCurrency(summary.total)}</p>
                <p className="text-slate-200/80 mt-2">{summary.itemCount} item{summary.itemCount === 1 ? "" : "s"} in cart</p>
              </div>
              <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-xl border border-white/10">
                <p className="text-sm text-slate-200 uppercase tracking-[0.18em] mb-2">Member since</p>
                <p className="text-3xl font-semibold">{memberSince}</p>
                <p className="text-slate-200/80 mt-2">Secure access to your account and orders.</p>
              </div>
            </div>
          </div>
        </section>
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Profile Summary</h2>
                  <p className="text-slate-500 mt-2">Your current account details and quick access actions.</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
                >
                  Sign out
                </button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-[0.16em]">Name</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">{user?.name ?? "—"}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-[0.16em]">Email</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">{user?.email ?? "—"}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Orders</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">0</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Wishlist</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">0</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Cart items</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{summary.itemCount}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Your Cart</h2>
                  <p className="text-slate-500 mt-2">Quick view of items saved in your cart.</p>
                </div>
                <p className="text-sm text-slate-500">{cartLoading ? "Loading..." : `${cartItems.length} item${cartItems.length === 1 ? "" : "s"}`}</p>
              </div>

              <div className="mt-6 space-y-4">
                {cartLoading ? (
                  <div className="rounded-3xl bg-slate-50 p-6 text-slate-500">Loading cart details…</div>
                ) : cartItems.length === 0 ? (
                  <div className="rounded-3xl bg-slate-50 p-6 text-slate-600">
                    Your cart is empty. Add items from the store to see them here.
                  </div>
                ) : (
                  cartItems.slice(0, 3).map((item) => (
                    <div key={item._id} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div>
                        <p className="font-semibold text-slate-900">{item.productId.name}</p>
                        <p className="text-sm text-slate-500 mt-1">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-slate-900">{formatCurrency(item.productId.discountPrice || item.productId.price)}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={() => navigate("/products")}
                  className="w-full rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
                >
                  Shop products
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full rounded-full border border-slate-200 bg-white px-6 py-3 text-slate-900 transition hover:bg-slate-50"
                >
                  Go to cart
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h3 className="text-xl font-semibold text-slate-900">Quick Actions</h3>
              <div className="mt-6 space-y-4">
                <button
                  onClick={() => navigate("/products")}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-slate-900 transition hover:bg-slate-100"
                >
                  Browse products
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-slate-900 transition hover:bg-slate-100"
                >
                  View cart details
                </button>
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-slate-900 transition hover:bg-slate-100"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-linear-to-br from-indigo-600 to-cyan-500 p-8 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">Need help?</p>
              <h3 className="mt-4 text-2xl font-semibold">Support on standby</h3>
              <p className="mt-3 text-slate-100/85 leading-7">
                Reach out if you want help with your account, orders, or checkout. We’re here to make your shopping experience simple.
              </p>
              <button
                onClick={() => window.location.href = 'mailto:support@shop.co'}
                className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
              >
                Contact support
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;