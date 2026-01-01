import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

export default function Favorites() {
  const { items } = useSelector((s) => s.products);
  const favs = useSelector((s) => s.favorites.ids);

  const favProducts = items.filter((p) => favs.includes(p.id));

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      {favProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
