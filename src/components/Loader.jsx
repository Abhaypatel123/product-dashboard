export default function Loader({ message = 'Loading...', size = 10, fullScreen = true }) {
  return (
    <div
      className={`flex items-center justify-center ${fullScreen ? 'fixed inset-0 z-50' : 'min-h-[50vh]'}`}
    >
      <div className="text-center">
        <div className="relative inline-block">
          <div
            className="rounded-full animate-spin border-4 border-transparent border-t-blue-500 border-r-blue-300"
            style={{ width: size * 5, height: size * 5 }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-reverse border-4 border-transparent border-t-blue-400 border-l-blue-200"
            style={{ width: size * 3, height: size * 3 }}
          />
        </div>
        <p className="mt-6 text-gray-600 font-medium text-sm sm:text-base animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}