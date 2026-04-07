import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Checkout = () => {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Checkout</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Complete your order</h1>
          <p className="mt-4 text-slate-600">Review your cart and confirm your purchase. Secure checkout is coming soon.</p>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">What happens next</h2>
            <p className="mt-3 text-slate-600">We will process your order and prepare your shipment as soon as payment details are completed.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Step 1</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">Review items</h3>
              <p className="mt-2 text-slate-600">Your selected items are ready in the cart. You can go back to update quantities.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Step 2</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">Confirm details</h3>
              <p className="mt-2 text-slate-600">Enter shipping and payment information to complete checkout.</p>
            </div>
          </div>
          <Link
            to="/cart"
            className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-8 py-4 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Return to Cart
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Checkout;
