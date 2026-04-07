import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../components/RatingStars";
import { fetchProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const toast = useToast();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setSize(data.sizes[0] || "");
        setColor(data.colors[0] || "");
      } catch (error) {
        toast.addToast({ message: "Unable to load product.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAdd = async () => {
    if (!product) return;
    try {
      await addToCart(product._id, quantity);
      toast.addToast({ message: "Added to cart successfully!" });
    } catch (error) {
      toast.addToast({
        message: error.response?.status === 401 ? "Please log in to add items to the cart." : "Unable to add item to cart.",
        type: "error",
      });
    }
  };

  if (loading) {
    return <div className="mx-auto max-w-7xl px-6 py-20 text-center text-slate-500">Loading product details...</div>;
  }

  if (!product) {
    return <div className="mx-auto max-w-7xl px-6 py-20 text-center text-slate-500">Product not found.</div>;
  }

  const displayPrice = product.discountPrice || product.price;

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-8">
          <img
            src={imageError ? "https://placehold.co/800x600/1e293b/ffffff?text=Product+Image" : product.image}
            alt={product.name}
            className="w-full rounded-3xl object-cover shadow-xl"
            loading="lazy"
            onError={handleImageError}
          />
          <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-4xl font-bold text-slate-900">{product.name}</h1>
            <p className="text-slate-500">{product.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <RatingStars rating={product.rating} size="md" />
              <span>{Math.round(product.rating)} star product</span>
              <span>{product.numReviews} reviews</span>
              <span>{product.stock} items in stock</span>
            </div>
          </div>
        </section>

        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Price</p>
            <div className="mt-3 flex items-center gap-4">
              <span className="text-4xl font-bold text-slate-900">${displayPrice.toFixed(2)}</span>
              {product.discountPrice ? (
                <span className="text-sm text-slate-500 line-through">${product.price.toFixed(2)}</span>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-slate-500">Select Size</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.sizes.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSize(option)}
                    className={`rounded-3xl border px-4 py-3 text-sm font-medium ${size === option ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-700"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-slate-500">Select Color</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((option) => (
                  <button
                    key={option}
                    onClick={() => setColor(option)}
                    className={`rounded-3xl border px-4 py-3 text-sm font-medium ${color === option ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-700"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-slate-500">Quantity</h3>
              <div className="mt-3 flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl text-slate-700">
                  -
                </button>
                <span className="min-w-[2rem] text-center text-lg font-semibold text-slate-900">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-xl text-slate-700">
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full rounded-3xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Add to Cart
          </button>
        </aside>
      </div>
    </main>
  );
};

export default ProductDetail;
