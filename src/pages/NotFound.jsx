import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-lg text-gray-600">Oops! The page you’re looking for doesn’t exist.</p>

      <Link
        to="/"
        className="mt-6 rounded-xl bg-black px-6 py-3 text-white text-sm font-medium hover:bg-gray-800 transition"
      >
        Go back to Home
      </Link>
    </div>
  );
}
