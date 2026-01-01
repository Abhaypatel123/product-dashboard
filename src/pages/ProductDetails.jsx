import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
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

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favs = useSelector((s) => s.favorites.ids);
  const isFav = favs.includes(Number(id));

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Mock multiple images for demo (in real app, product would have multiple images)
  const productImages = product
    ? [
        product.image,
        `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=60`,
        `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w-800&auto=format&fit=crop&q=60&grayscale`,
        `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=60&blur=2`,
      ]
    : [];

  useEffect(() => {
    let isMounted = true;

    async function fetchProduct() {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        if (isMounted) {
          setProduct(res.data);
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    }

    fetchProduct();
    return () => (isMounted = false);
  }, [id]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return <Loader message="Loading product details...." />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center">
        <div className="rounded-full bg-gradient-to-r from-red-100 to-pink-100 p-8 mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-white font-medium hover:shadow-lg transition-all"
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
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="group flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Products</span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="rounded-full p-2 hover:bg-gray-100">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => dispatch(toggleFavorite(product.id))}
                className="relative rounded-full p-2 hover:bg-gray-100"
              >
                <Heart
                  className={`h-5 w-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-2xl shadow-blue-500/5">
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={() => dispatch(toggleFavorite(product.id))}
                  className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 ${
                    isFav
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFav ? 'fill-white' : ''}`} />
                </button>
              </div>

              <div className="flex h-[400px] items-center justify-center">
                <img
                  src={productImages[selectedImage]}
                  alt={product.title}
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-1 overflow-hidden rounded-2xl border-2 transition-all hover:scale-105 ${
                    selectedImage === index
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex h-24 items-center justify-center bg-gradient-to-br from-gray-50 to-white p-4">
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
          <div className="lg:pl-12">
            {/* Category & Rating */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                {product.category}
              </span>
              <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 px-4 py-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(product.rating.rate)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {product.rating.rate} · {product.rating.count} reviews
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
              {product.title}
            </h1>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold text-gray-900">${product.price}</span>
                <span className="text-lg text-gray-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <span className="rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 text-sm font-semibold text-green-700">
                  Save 20%
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">+ $4.99 shipping</p>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Description</h3>
              <p className="leading-relaxed text-gray-700">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-10">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-2xl border border-gray-200 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-l-2xl"
                  >
                    −
                  </button>
                  <span className="w-16 text-center text-xl font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-r-2xl"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  Total:{' '}
                  <span className="text-xl font-bold text-gray-900">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-12 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleAddToCart}
                className={`flex-1 rounded-2xl px-8 py-4 font-semibold transition-all ${
                  addedToCart
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  {addedToCart ? (
                    <>
                      <Check className="h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </div>
              </button>

              <button
                onClick={() => dispatch(toggleFavorite(product.id))}
                className={`flex-1 rounded-2xl border-2 px-8 py-4 font-semibold transition-all ${
                  isFav
                    ? 'border-red-500 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <Heart className={`h-5 w-5 ${isFav ? 'fill-red-500' : ''}`} />
                  {isFav ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </div>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-100 to-blue-50">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-600">3-5 business days</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-100 to-emerald-50">
                  <RotateCcw className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Easy Returns</h4>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-100 to-amber-50">
                  <Shield className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">1 Year Warranty</h4>
                  <p className="text-sm text-gray-600">Manufacturer guarantee</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-100 to-purple-50">
                  <Check className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Authentic</h4>
                  <p className="text-sm text-gray-600">100% genuine product</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
