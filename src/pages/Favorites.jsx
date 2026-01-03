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
    <div className="max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl mx-6 mt-6 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              <span className="flex items-center gap-3">
                <Heart className="w-10 h-10 text-red-500 fill-red-500" />
                My Favorite Collection
              </span>
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              Your curated selection of loved products. Save items you adore for later purchase!
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <span className="font-semibold">{favProducts.length} Items</span>
              </div>
              <span className="text-gray-500">Last updated: Today</span>
            </div>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105">
            Share Collection
          </button>
        </div>
      </div>
      <div className="p-6">
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Your Favorites ({favProducts.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favProducts.map((p) => (
              <div key={p.id} className="relative group">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </>
      </div>
    </div>
  );
}
