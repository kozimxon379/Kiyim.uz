import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useStore } from './Context';
import { Moon, Sun, ShoppingBag, Heart, User, LogOut } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Login from './pages/Login';
import About from './pages/About';
import Faq from './pages/Faq';

function Navbar() {
  const { theme, toggleTheme, lang, setLang, t, cart, favorites, user, logout } = useStore();
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'text-orange-500 font-bold' : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition';

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-black tracking-widest bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
          KICKS<span className="text-neutral-900 dark:text-white">STORE</span>
        </Link>
        
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className={isActive('/')}>{t.home}</Link>
          <Link to="/shop" className={isActive('/shop')}>{t.shop}</Link>
          <Link to="/about" className={isActive('/about')}>{t.aboutUs}</Link>
          <Link to="/faq" className={isActive('/faq')}>{t.faq}</Link>
          <Link to="/contact" className={isActive('/contact')}>{t.contact}</Link>
          
          <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-700 mx-2"></div>

          {/* Lang */}
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent text-neutral-900 dark:text-white outline-none cursor-pointer font-bold uppercase text-xs">
            <option className="bg-white dark:bg-neutral-900 text-black dark:text-white" value="uz">UZ</option>
            <option className="bg-white dark:bg-neutral-900 text-black dark:text-white" value="ru">RU</option>
            <option className="bg-white dark:bg-neutral-900 text-black dark:text-white" value="en">EN</option>
          </select>

          {/* Theme */}
          <button onClick={toggleTheme} className="text-neutral-500 hover:text-orange-500 dark:text-neutral-400 dark:hover:text-orange-400 transition">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Favorites */}
          <Link to="/favorites" className={`relative ${isActive('/favorites')}`}>
            <Heart size={20} />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className={`relative ${isActive('/cart')}`}>
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth / Admin */}
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'admin' && (
                <Link to="/admin" className={isActive('/admin')}>
                  <User size={20} className="text-orange-500" />
                </Link>
              )}
              <button onClick={logout} className="text-red-500 hover:text-red-600 transition" title={t.logout}>
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className={isActive('/login')}>
              <User size={20} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const { theme } = useStore();

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white">
        <Navbar />

        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <footer className="border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950 py-8 text-center text-sm text-neutral-500 dark:text-neutral-500 transition-colors duration-300">
          <p>© 2026 KicksStore. Barcha huquqlar himoyalangan.</p>
        </footer>
        <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff', borderRadius: '12px' } }} />
      </div>
    </Router>
  );
}