import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import { setSearch, setCategory, setSort } from '../features/filters/filtersSlice';
import { useDebounce } from '../hooks/useDebounce';
import SkeletonGrid from '../components/SkeletonGrid';
import Toolbar from '../components/Toolbar';

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.products);
  const { search, category, sort } = useSelector((s) => s.filters);
  const debouncedSearch = useDebounce(search, 300);
  const loading = status === 'loading';

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    let data = [...items]; // 👈 clone first

    if (category && category !== 'All Categories') {
      data = data.filter((p) => p.category === category);
    }

    // Search filter
    if (debouncedSearch) {
      data = data.filter((p) => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }

    // Sorting
    if (sort === 'Price: Low to High') {
      data = [...data].sort((a, b) => a.price - b.price);
    }
    if (sort === 'Price: High to Low') {
      data = [...data].sort((a, b) => b.price - a.price);
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
