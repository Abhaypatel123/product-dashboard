import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, ChevronDown, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { setSearch, setCategory, setSort } from '../features/filters/filtersSlice';

const categories = [
  'All Categories',
  "men's clothing",
  'jewelery',
  'electronics',
  "women's clothing",
];

const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low'];

export default function Toolbar() {
  const dispatch = useDispatch();
  const { search, category, sort } = useSelector((s) => s.filters);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const categoryRef = useRef(null);
  const sortRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearAllFilters = () => {
    dispatch(setSearch(''));
    dispatch(setCategory('All Categories'));
    dispatch(setSort('Default'));
  };

  const hasActiveFilters = search || category !== 'All Categories' || sort !== 'Default';

  return (
    <div className="mb-8">
      {/* Main Toolbar */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-primary/5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
          {/* Search - Enhanced */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <div
                  className={`rounded-full p-2 transition-all duration-300 ${
                    searchActive ? 'bg-primary/10 text-primary' : 'text-gray-400'
                  }`}
                >
                  <Search className="h-4 w-4" />
                </div>
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                onFocus={() => setSearchActive(true)}
                onBlur={() => setSearchActive(false)}
                placeholder="Search products by name, description..."
                className="h-14 w-full rounded-xl border-2 border-gray-200 bg-white pl-12 pr-14 text-sm font-medium transition-all duration-300 
                  focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 focus:shadow-lg"
              />

              {search && (
                <button
                  onClick={() => dispatch(setSearch(''))}
                  className="group absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-400 transition-all group-hover:scale-110 group-hover:text-red-500" />
                </button>
              )}

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 transition-opacity duration-300 peer-focus:opacity-100"></div>
            </div>

            {search && (
              <div className="mt-2 flex items-center gap-2 pl-4">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"></div>
                <span className="text-xs text-gray-500">
                  Searching for: <span className="font-semibold text-primary">{search}</span>
                </span>
              </div>
            )}
          </div>

          {/* Filter Cards */}
          <div className="flex flex-col gap-4 sm:flex-row lg:gap-6">
            {/* Category Card */}
            <div className="relative min-w-[220px]" ref={categoryRef}>
              <button
                onClick={() => {
                  setCategoryOpen(!categoryOpen);
                  setSortOpen(false);
                }}
                className={`group relative w-full overflow-hidden rounded-xl border-2 ${
                  categoryOpen
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 bg-white hover:border-primary/50'
                } p-4 text-left transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-lg p-2 transition-colors ${
                        categoryOpen
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-primary/10'
                      }`}
                    >
                      <Filter className="h-4 w-4" />
                    </div>
                    <div>
                      <span
                        className={`block text-xs font-medium uppercase tracking-wider ${
                          categoryOpen ? 'text-primary' : 'text-gray-500'
                        }`}
                      >
                        Category
                      </span>
                      <span className="block truncate text-sm font-semibold text-gray-900">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-all duration-300 ${
                      categoryOpen ? 'rotate-180 text-primary' : 'group-hover:text-primary'
                    }`}
                  />
                </div>
              </button>

              {/* Dropdown */}
              {categoryOpen && (
                <div className="absolute z-50 mt-2 w-full animate-slideDown overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
                  <div className="border-b border-gray-100 p-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Select Category
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto py-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          dispatch(setCategory(cat));
                          setCategoryOpen(false);
                        }}
                        className={`group flex w-full items-center justify-between px-4 py-3 text-left transition-all hover:bg-gray-50
                          ${cat === category ? 'bg-primary/5' : ''}`}
                      >
                        <span
                          className={`font-medium ${cat === category ? 'text-primary' : 'text-gray-700'}`}
                        >
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </span>
                        {cat === category && (
                          <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sort Card */}
            <div className="relative min-w-[220px]" ref={sortRef}>
              <button
                onClick={() => {
                  setSortOpen(!sortOpen);
                  setCategoryOpen(false);
                }}
                className={`group relative w-full overflow-hidden rounded-xl border-2 ${
                  sortOpen
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 bg-white hover:border-amber-500/50'
                } p-4 text-left transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-lg p-2 transition-colors ${
                        sortOpen
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-amber-500/10'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                    <div>
                      <span
                        className={`block text-xs font-medium uppercase tracking-wider ${
                          sortOpen ? 'text-amber-600' : 'text-gray-500'
                        }`}
                      >
                        Sort By
                      </span>
                      <span className="block truncate text-sm font-semibold text-gray-900">
                        {sort}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-all duration-300 ${
                      sortOpen ? 'rotate-180 text-amber-500' : 'group-hover:text-amber-500'
                    }`}
                  />
                </div>
              </button>

              {/* Dropdown */}
              {sortOpen && (
                <div className="absolute z-50 mt-2 w-full animate-slideDown overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
                  <div className="border-b border-gray-100 p-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Sort Options
                    </h3>
                  </div>
                  <div className="py-2">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          dispatch(setSort(opt));
                          setSortOpen(false);
                        }}
                        className={`group flex w-full items-center justify-between px-4 py-3 text-left transition-all hover:bg-gray-50
                          ${opt === sort ? 'bg-amber-50' : ''}`}
                      >
                        <span
                          className={`font-medium ${opt === sort ? 'text-amber-600' : 'text-gray-700'}`}
                        >
                          {opt}
                        </span>
                        {opt === sort && (
                          <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters Indicator */}
        {hasActiveFilters && (
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-ping rounded-full bg-primary"></div>
              <span className="text-sm font-medium text-primary">Active Filters:</span>
            </div>

            {search && (
              <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm shadow-sm">
                <span className="text-gray-600">Search:</span>
                <span className="font-semibold text-primary">{search}</span>
                <button
                  onClick={() => dispatch(setSearch(''))}
                  className="ml-1.5 rounded-full p-0.5 hover:bg-gray-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {category !== 'All Categories' && (
              <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm shadow-sm">
                <Filter className="h-3 w-3 text-gray-400" />
                <span className="font-semibold text-primary">{category}</span>
                <button
                  onClick={() => dispatch(setCategory('All Categories'))}
                  className="ml-1.5 rounded-full p-0.5 hover:bg-gray-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {sort !== 'Default' && (
              <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm shadow-sm">
                <ChevronDown className="h-3 w-3 text-gray-400" />
                <span className="font-semibold text-amber-600">{sort}</span>
                <button
                  onClick={() => dispatch(setSort('Default'))}
                  className="ml-1.5 rounded-full p-0.5 hover:bg-gray-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
