import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import { setSearch } from "../features/filters/filtersSlice";
import { useDebounce } from "../hooks/useDebounce";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.products);
  const { search } = useSelector((s) => s.filters);
  const debounced = useDebounce(search);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const filtered = items.filter((p) =>
    p.title.toLowerCase().includes(debounced.toLowerCase())
  );

  console.log("filtered...",filtered)

  return (
    <div className="p-4">
      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search..."
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
