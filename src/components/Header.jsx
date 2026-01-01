import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const favCount = useSelector((s) => s.favorites.ids.length);

    const linkClass = ({ isActive }) =>
        `relative px-3 py-2 text-sm font-medium transition
     ${isActive ? "text-primary" : "text-slate-600 hover:text-primary"}`;

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-xl font-extrabold text-primary">
                            🛍️ ShopMate
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <nav className="flex items-center gap-6">
                        <NavLink to="/" className={linkClass}>
                            Products
                        </NavLink>

                        <NavLink to="/favorites" className={linkClass}>
                            Favorites
                            {favCount > 0 && (
                                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
                                    {favCount}
                                </span>
                            )}
                        </NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
}
