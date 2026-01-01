import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import { setSearch } from '../features/filters/filtersSlice';
import { useDebounce } from '../hooks/useDebounce';

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.products);
  const { search } = useSelector((s) => s.filters);
  const debounced = useDebounce(search);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filtered = items.filter((p) => p.title.toLowerCase().includes(debounced.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Search products..."
          className="w-full rounded-xl border border-muted px-4 py-3 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary transition outline-none bg-secondary text-white placeholder:text-muted"
        />
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex flex-col justify-center items-center min-h-[50vh] gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-primary font-semibold">Loading products...</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.length > 0 ? (
            filtered.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="col-span-full text-center text-muted text-lg">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
