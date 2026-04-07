import { Link } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-x-0 top-0 h-12 bg-slate-900 text-center text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/80">
        Sign in and get 20% off your first order — Sign Up Now
      </div>
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:flex lg:items-center lg:justify-between lg:pb-24">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">100% Authentic luxury</p>
          <h1 className="mt-6 text-3xl font-black uppercase leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Find clothes that matches your style
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and
            build your sense of style.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:mt-10">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl transition hover:bg-slate-100 sm:px-8 sm:py-4"
            >
              Shop Now
            </Link>
            <Link
              to="/cart"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20 sm:px-8 sm:py-4"
            >
              View Cart
            </Link>
          </div>
        </div>

        <div className="mt-12 lg:mt-0 lg:w-1/2 lg:max-w-2xl">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:rounded-[3rem] sm:p-6">
            <img
              src={imageError ? "https://placehold.co/800x600/1e293b/ffffff?text=Fashion+Showcase" : "https://picsum.photos/1000/600?random=hero"}
              alt="Fashion showcase"
              className="h-64 w-full rounded-2xl object-cover sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px]"
              loading="lazy"
              onError={handleImageError}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-slate-950/90 via-slate-950/10 to-transparent sm:h-32" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
