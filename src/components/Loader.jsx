export default function Loader({ message = 'Loading...', size = 16, minHeight = '50vh' }) {
  return (
    <div className="flex flex-col justify-center items-center gap-4" style={{ minHeight }}>
      <div
        className={`border-4 border-primary border-t-transparent rounded-full animate-spin`}
        style={{ width: size * 4, height: size * 4 }}
      />
      <p className="text-primary font-semibold text-sm sm:text-base">{message}</p>
    </div>
  );
}
