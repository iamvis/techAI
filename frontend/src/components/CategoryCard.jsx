import { Link } from "react-router-dom";
import { useState } from "react";

const CategoryCard = ({ category }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="group relative overflow-hidden rounded-4xl border border-slate-200 bg-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(15,23,42,0.15)]"
    >
      <img
        src={imageError ? "https://placehold.co/400x400/1e293b/ffffff?text=Category" : category.image}
        alt={category.name}
        className="h-48 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-56 md:h-64 lg:h-72"
        loading="lazy"
        onError={handleImageError} />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
      <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6">
        <p className="text-xl font-black uppercase tracking-widest text-white sm:text-2xl lg:text-3xl">{category.name}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
