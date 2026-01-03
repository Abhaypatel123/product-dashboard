import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { items } = useSelector((s) => s.products);
  const favs = useSelector((s) => s.favorites.ids);
  const favProducts = items.filter((p) => favs.includes(p.id));

  if (favProducts.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-8">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center">
            <Heart className="w-16 h-16 text-rose-300 dark:text-rose-700" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">❤️</span>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          Your Favorites List is Empty
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md text-center">
          Start building your collection! Tap the heart icon on products you love to save them here
          for easy access.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      {favProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
