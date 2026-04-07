import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import ReviewCard from "../components/ReviewCard";
import Footer from "../components/Footer";
import { fetchCategories, fetchProducts, subscribeNewsletter } from "../services/productService";

const reviews = [
  { name: "Sarah M.", rating: 5, comment: "The quality is amazing and the shipping was incredibly fast." },
  { name: "Alex K.", rating: 4.8, comment: "SHOP.CO takes the guesswork out of styling with perfect fits." },
  { name: "James L.", rating: 4.9, comment: "The product selection is on point and the service is excellent." },
];

const brands = ["Versace", "Zara", "Gucci", "Prada", "Calvin Klein"];

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const toast = useToast();

  useEffect(() => {
    const loadData = async () => {
      const [categoryData, arrivalData, sellingData] = await Promise.all([
        fetchCategories(),
        fetchProducts({ sort: "newest", limit: 8 }),
        fetchProducts({ sort: "popularity", limit: 8 }),
      ]);

      setCategories(categoryData);
      setNewArrivals(arrivalData.products);
      setTopSelling(sellingData.products);
    };

    loadData();
  }, []);

  const handleSubscribe = async (event) => {
    event.preventDefault();

    try {
      const response = await subscribeNewsletter(newsletterEmail);
      toast.addToast({ message: response.message || "Subscribed successfully" });
      setNewsletterEmail("");
    } catch (error) {
      toast.addToast({
        message: error.response?.data?.message || "Unable to subscribe right now.",
        type: "error",
      });
    }
  };

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-4xl bg-slate-950 p-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Brands</p>
            <h2 className="mt-4 text-4xl font-black">200+</h2>
            <p className="mt-4 text-sm text-slate-400">International brands across luxury and streetwear.</p>
          </div>
          <div className="rounded-4xl bg-slate-950 p-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Products</p>
            <h2 className="mt-4 text-4xl font-black">2,000+</h2>
            <p className="mt-4 text-sm text-slate-400">High-quality curated pieces for every occasion.</p>
          </div>
          <div className="rounded-4xl bg-slate-950 p-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Customers</p>
            <h2 className="mt-4 text-4xl font-black">30,000+</h2>
            <p className="mt-4 text-sm text-slate-400">Happy shoppers worldwide trust SHOP.CO.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-[0.2em] text-slate-900">Trusted by top fashion names</h2>
              <p className="mt-3 text-sm uppercase tracking-[0.35em] text-slate-500">From luxury houses to street style icons</p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {brands.map((brand) => (
              <div key={brand} className="rounded-4xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-700">{brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-widest text-slate-900">New Arrivals</h2>
            <p className="mt-3 max-w-xl text-slate-600">Fresh arrivals in the Shop.Co collection for the season.</p>
          </div>
          <Link to="/products" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 transition hover:border-slate-400">
            View All
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-widest text-slate-900">Top Selling</h2>
              <p className="mt-3 max-w-xl text-slate-600">Our most-loved items, selected by customers worldwide.</p>
            </div>
            <Link to="/products" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 transition hover:border-slate-400">
              View All
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {topSelling.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] bg-slate-100 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.1)] sm:rounded-[3rem] sm:p-8">
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-[0.12em]">Our happy customers</h2>
              <p className="mt-3 max-w-xl text-slate-400">Real reviews from people who love SHOP.CO.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Stay up to date about our latest offers</p>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-widest text-white">Subscribe to Newsletter</h2>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-full border border-slate-700 bg-slate-950 px-6 py-4 text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
              />
              <button className="rounded-full bg-amber-400 px-8 py-4 font-semibold text-slate-950 transition hover:bg-amber-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
