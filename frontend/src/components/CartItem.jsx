import { useState } from "react";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const product = item.productId;
  const price = product.discountPrice || product.price;
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <img src={imageError ? "https://placehold.co/200x200/1e293b/ffffff?text=Product" : product.image} alt={product.name} className="h-28 w-28 rounded-3xl object-cover" loading="lazy" onError={handleImageError} />
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <p className="mt-2 text-sm text-slate-500">${price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
          <button
            onClick={() => onQuantityChange(item._id, Math.max(1, item.quantity - 1))}
            className="text-slate-700"
          >
            −
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => onQuantityChange(item._id, item.quantity + 1)}
            className="text-slate-700"
          >
            +
          </button>
        </div>
        <button
          onClick={() => onRemove(item._id)}
          className="rounded-3xl bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-700 hover:bg-rose-200"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
