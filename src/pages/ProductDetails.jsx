import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { fetchProductById } from '../features/products/productsThunks';

import {
  ChevronLeft,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Check,
  Share2,
} from 'lucide-react';
import Loader from '../components/Loader';
import {
  selectProductById,
  selectProductLoadingById,
} from '../features/products/productsSelectors';

export default function ProductDetails() {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    selectProductById(state, productId)
  );
  const loading = useSelector((state) =>
    Boolean(selectProductLoadingById(state, productId))
  );
  const favs = useSelector((s) => s.favorites.ids);
  const isFav = favs.includes(productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  useEffect(() => {
    if (!product && !loading) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, product, loading]);

  const productImages = [
    product?.image,
    `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800`,
    `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&grayscale`,
    `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&blur=2`,
  ];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };


  if (loading) {
    return <Loader message="Loading product details..." />;
  }


  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center">
        <div className="rounded-full bg-gradient-to-r from-red-100 to-pink-100 p-6 mb-6">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-8 text-sm">The product doesn't exist.</p>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-white font-medium hover:shadow-lg transition-all text-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back
            </Link>
            <div className="flex items-center gap-3">
              <button className="rounded-full p-2 hover:bg-gray-100 transition-colors">
                <Share2 className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={() => dispatch(toggleFavorite(product.id))}
                className="relative rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <Heart
                  className={`h-4 w-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg shadow-blue-500/5">
              <div className="absolute right-3 top-3 z-10">
                <button
                  onClick={() => dispatch(toggleFavorite(product.id))}
                  className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all hover:scale-110 ${isFav
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <Heart className={`h-4 w-4 ${isFav ? 'fill-white' : ''}`} />
                </button>
              </div>

              <div className="flex h-[320px] items-center justify-center p-4">
                <img
                  src={productImages[selectedImage]}
                  alt={product.title}
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-1 overflow-hidden rounded-xl border transition-all hover:scale-105 ${selectedImage === index
                    ? 'border-blue-500 shadow-md shadow-blue-500/20'
                    : 'border-gray-200'
                    }`}
                >
                  <div className="flex h-20 items-center justify-center bg-gradient-to-br from-gray-50 to-white p-3">
                    <img
                      src={img}
                      alt={`${product.title} view ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:pl-8">
            {/* Category & Rating */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gradient-to-r from-blue-100 to-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 px-3 py-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.round(product.rating.rate)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {product.rating.rate} · {product.rating.count} reviews
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl">
              {product.title}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                <span className="text-base text-gray-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <span className="rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                  Save 20%
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">+ $4.99 shipping</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="mb-2 text-base font-semibold text-gray-900">Description</h3>
              <p className="text-sm leading-relaxed text-gray-700">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="mb-2 text-base font-semibold text-gray-900">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-xl border border-gray-200 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-l-xl"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-lg font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-r-xl"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  Total:{' '}
                  <span className="text-lg font-bold text-gray-900">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                className={`flex-1 rounded-xl px-6 py-3 font-semibold transition-all ${addedToCart
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
                  }`}
              >
                <div className="flex items-center justify-center gap-2 text-sm">
                  {addedToCart ? (
                    <>
                      <Check className="h-4 w-4" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </div>
              </button>

              <button
                onClick={() => dispatch(toggleFavorite(product.id))}
                className={`flex-1 rounded-xl border-2 px-6 py-3 font-semibold transition-all text-sm ${isFav
                  ? 'border-red-500 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 hover:from-red-100 hover:to-pink-100'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Heart className={`h-4 w-4 ${isFav ? 'fill-red-500' : ''}`} />
                  {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                </div>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-md">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-100 to-blue-50">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Free Shipping</h4>
                  <p className="text-xs text-gray-600">3-5 days</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-green-100 to-emerald-50">
                  <RotateCcw className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Easy Returns</h4>
                  <p className="text-xs text-gray-600">30-day policy</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-amber-100 to-amber-50">
                  <Shield className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">1 Year Warranty</h4>
                  <p className="text-xs text-gray-600">Guaranteed</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-100 to-purple-50">
                  <Check className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Authentic</h4>
                  <p className="text-xs text-gray-600">100% genuine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
