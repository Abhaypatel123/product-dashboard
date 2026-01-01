import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const favs = useSelector((s) => s.favorites.ids);
  const isFav = favs.includes(product.id);

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Favorite Button */}
      <button
        onClick={() => dispatch(toggleFavorite(product.id))}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow hover:scale-110 transition"
        aria-label="Toggle Favorite"
      >
        <span className="text-lg">
          {isFav ? "❤️" : "🤍"}
        </span>
      </button>

      {/* Image */}
      <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">
          {product.title}
        </h3>

        <p className="mt-2 text-lg font-bold text-slate-900">
          ₹ {product.price}
        </p>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <Link
            to={`/product/${product.id}`}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            View details →
          </Link>

          <span className="text-xs rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">
            In stock
          </span>
        </div>
      </div>
    </div>
  );
}
