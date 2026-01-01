import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const favCount = useSelector((s) => s.favorites.ids.length);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Products', icon: ShoppingBag },
    { to: '/favorites', label: 'Favorites', icon: Heart, badge: favCount },
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 blur-sm group-hover:blur transition-all duration-300"></div>
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-md">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-lg font-bold text-gray-900 group-hover:text-gray-800">
                  StyleHub
                </span>
                <span className="text-xs text-gray-500 -mt-1">Premium Finds</span>
              </div>
              <div className="sm:hidden text-lg font-bold text-gray-900">StyleHub</div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  <div className="relative">
                    <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                    {badge > 0 && (
                      <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-sm">
                        <span className="text-xs font-semibold text-white">{badge}</span>
                      </div>
                    )}
                  </div>
                  <span>{label}</span>
                  <div className="absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                  </div>
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              {favCount > 0 && (
                <Link
                  to="/favorites"
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
                >
                  <Heart className="h-5 w-5 text-gray-700" />
                  <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow">
                    <span className="text-xs font-bold text-white">{favCount}</span>
                  </div>
                </Link>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-gray-700" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md animate-slideDown">
            <div className="px-4 py-3">
              {navLinks.map(({ to, label, icon: Icon, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3.5 rounded-xl mb-1 text-base font-medium transition-all duration-200
                    ${isActive
                      ? 'text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${'bg-gray-200'
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span>{label}</span>
                  </div>
                  {badge > 0 && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-500">
                      <span className="text-xs font-bold text-white">{badge}</span>
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
