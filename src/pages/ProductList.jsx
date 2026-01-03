import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsThunks';
import { selectAllProducts, selectProductsStatus } from '../features/products/productsSelectors';
import ProductCard from '../components/ProductCard';
import { useDebounce } from '../hooks/useDebounce';
import SkeletonGrid from '../components/SkeletonGrid';
import Toolbar from '../components/Toolbar';

export default function ProductList() {
  const dispatch = useDispatch();

  const items = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);

  const { search, category, sort } = useSelector((s) => s.filters);
  const debouncedSearch = useDebounce(search, 300);

  const loading = status === 'loading';

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = useMemo(() => {
    let data = [...items];

    if (category && category !== 'All Categories') {
      data = data.filter((p) => p.category === category);
    }

    if (debouncedSearch) {
      data = data.filter((p) => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }

    if (sort === 'Price: Low to High') {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === 'Price: High to Low') {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [items, debouncedSearch, category, sort]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Toolbar />

      {loading && <SkeletonGrid />}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
