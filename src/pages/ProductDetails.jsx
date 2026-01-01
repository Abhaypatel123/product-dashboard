import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favs = useSelector((s) => s.favorites.ids);
  const isFav = favs.includes(Number(id));

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchProduct() {
      try {
        const res = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        if (isMounted) {
          setProduct(res.data);
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    }

    fetchProduct();
    return () => (isMounted = false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold text-muted">
          Loading product…
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-red-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* Back */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          ← Back to products
        </Link>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
          {/* Image Card */}
          <div className="relative rounded-3xl bg-white p-10 shadow-sm">
            <button
              onClick={() => dispatch(toggleFavorite(product.id))}
              className="absolute right-5 top-5 rounded-full bg-white p-3 shadow hover:scale-110 transition"
            >
              {isFav ? "❤️" : "🤍"}
            </button>

            <div className="flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-[420px] object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Category */}
            <span className="w-fit rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="mt-4 text-3xl font-extrabold text-secondary">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex text-yellow-400 text-lg">
                {"★".repeat(Math.round(product.rating.rate))}
                {"☆".repeat(5 - Math.round(product.rating.rate))}
              </div>
              <span className="text-sm text-muted">
                {product.rating.rate} · {product.rating.count} reviews
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 leading-relaxed text-muted">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-8 flex items-center gap-6">
              <p className="text-4xl font-black text-secondary">
                ₹ {product.price}
              </p>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                In stock
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="flex-1 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white hover:bg-primaryDark transition">
                Add to Cart
              </button>

              <button
                onClick={() => dispatch(toggleFavorite(product.id))}
                className="flex-1 rounded-xl border border-slate-300 px-8 py-4 text-lg font-semibold text-secondary hover:bg-slate-100 transition"
              >
                {isFav ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Extra Info */}
            <div className="mt-12 grid grid-cols-2 gap-8 text-sm text-muted">
              <div>
                <p className="font-semibold text-secondary">
                  🚚 Free Delivery
                </p>
                <p>3–5 business days</p>
              </div>
              <div>
                <p className="font-semibold text-secondary">
                  🔁 Easy Returns
                </p>
                <p>7 days return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
