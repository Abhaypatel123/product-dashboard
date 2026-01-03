export function applyProductFilters(items, { search, category, sort }) {
  let data = [...items];
  if (category && category !== 'All Categories') {
    data = data.filter((p) => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    data = data.filter((p) => p.title.toLowerCase().includes(q));
  }

  if (sort === 'Price: Low to High') {
    data.sort((a, b) => a.price - b.price);
  }

  if (sort === 'Price: High to Low') {
    data.sort((a, b) => b.price - a.price);
  }

  return data;
}
