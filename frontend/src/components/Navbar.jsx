import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { summary } = useCart();
  const { user, logout } = useAuth();

  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("search", query.trim());
    const url = `/products${params.toString() ? `?${params.toString()}` : ""}`;
    navigate(url);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950 text-white shadow-xl shadow-slate-900/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="text-2xl font-black uppercase tracking-[0.2em] text-white">
            SHOP.CO
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-md border border-slate-700 p-2 text-slate-200 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            <span className="text-xl">{open ? "✕" : "☰"}</span>
          </button>
        </div>

        <div className="hidden md:flex md:items-center md:justify-between md:gap-6 md:w-full">
          <nav className="flex items-center gap-6">
            <Link
              to="/products"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-100 transition hover:text-white"
            >
              Shop
            </Link>
            <Link
              to="/products?sort=newest"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-100 transition hover:text-white"
            >
              New Arrivals
            </Link>
            <Link
              to="/products?sort=price_asc"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-100 transition hover:text-white"
            >
              On Sale
            </Link>
            <Link
              to="/products"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-100 transition hover:text-white"
            >
              Brands
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative w-full max-w-xs">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for products..."
                className="w-full rounded-full border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
              />
            </form>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="rounded-full border border-slate-700 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="rounded-full border border-slate-700 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-full border border-slate-700 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-full border border-slate-700 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                  >
                    Register
                  </Link>
                </>
              )}
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Cart
                <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-950">
                  {summary.itemCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full z-40 bg-slate-950/95 border-t border-slate-800/30 p-4 backdrop-blur-xl shadow-2xl md:hidden">
          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for products..."
              className="w-full rounded-full border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
            />
          </form>
          <nav className="flex flex-col gap-3">
            <Link
              to="/products"
              onClick={() => setOpen(false)}
              className="rounded-3xl bg-slate-900/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-100 transition hover:bg-slate-800"
            >
              Shop
            </Link>
            <Link
              to="/products?sort=newest"
              onClick={() => setOpen(false)}
              className="rounded-3xl bg-slate-900/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-100 transition hover:bg-slate-800"
            >
              New Arrivals
            </Link>
            <Link
              to="/products?sort=price_asc"
              onClick={() => setOpen(false)}
              className="rounded-3xl bg-slate-900/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-100 transition hover:bg-slate-800"
            >
              On Sale
            </Link>
            <Link
              to="/products"
              onClick={() => setOpen(false)}
              className="rounded-3xl bg-slate-900/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-100 transition hover:bg-slate-800"
            >
              Brands
            </Link>
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                    navigate("/");
                  }}
                  className="rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Register
                </Link>
              </>
            )}
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Cart
              <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-950">
                {summary.itemCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
