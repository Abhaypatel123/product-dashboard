import React from 'react';
import { Search, Package } from 'lucide-react';

export default function EmptyState({ search, onClear }) {
  return (
    <div className="col-span-full text-center py-16">
      {search ? (
        <>
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2 ">
            No products found for "{search}"
          </h3>
          <p className="text-gray-500 mb-6">Try different keywords or browse all products</p>
          <button
            onClick={onClear}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm cursor-pointer"
          >
            Clear Search
          </button>
        </>
      ) : (
        <>
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No products available</h3>
          <p className="text-gray-500">Please check back later</p>
        </>
      )}
    </div>
  );
}
