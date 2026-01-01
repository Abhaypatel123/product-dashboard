import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

export default function Favorites() {
  const { items } = useSelector((s) => s.products);
  const favs = useSelector((s) => s.favorites.ids);

  const favProducts = items.filter((p) => favs.includes(p.id));

  // ✅ Empty state
  if (favProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          No favorites yet
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-sm">
          You haven’t added any products to your favorites. Tap the ❤️ icon on a product to save it
          here.
        </p>
      </div>
    );
  }

  // ✅ Normal favorites list
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      {favProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
