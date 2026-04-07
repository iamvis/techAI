import { Link } from "react-router-dom";
import { useState } from "react";
import RatingStars from "./RatingStars";

const ProductCard = ({ product }) => {
  const price = product.discountPrice || product.price;
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden rounded-4xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(15,23,42,0.15)]">
      <Link to={`/products/${product._id}`}>
        <div className="relative overflow-hidden rounded-t-4xl bg-slate-100">
          <img
            src={imageError ? "https://placehold.co/400x400/1e293b/ffffff?text=No+Image" : product.image}
            alt={product.name}
            className="h-48 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-56 md:h-64 lg:h-72"
            loading="lazy"
            onError={handleImageError}
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1">
            {product.category}
          </span>
        </div>
      </Link>
      <div className="flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
              {Math.round(product.rating)} star
            </span>
          </div>
          <div className="mt-3">
            <RatingStars rating={product.rating} />
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-slate-500">{product.description}</p>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <span className="text-2xl font-black text-slate-950">${price.toFixed(2)}</span>
          {product.discountPrice ? (
            <span className="text-sm text-slate-400 line-through">${product.price.toFixed(2)}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
