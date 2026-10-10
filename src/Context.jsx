import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { defaultProducts, translations } from './data';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  // Language
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'uz');
  useEffect(() => localStorage.setItem('lang', lang), [lang]);
  const t = translations[lang];

  // Auth
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  useEffect(() => localStorage.setItem('user', JSON.stringify(user)), [user]);
  const login = (username, password) => {
    if ((username === 'islomxonovkozim@gmail.com' && password === '26022012') || (username === '+998901234567' && password === '12345')) {
      setUser({ username, role: username === 'islomxonovkozim@gmail.com' ? 'admin' : 'user' });
      return true;
    }
    return false;
  };
  const logout = () => setUser(null);

  // Products (Admin can edit)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    let parsed = saved ? JSON.parse(saved) : null;
    
    // Agar oldingi test ma'lumotlari bo'lsa (masalan, krossovka rasmi bo'lmasa yoki umuman rasm bo'lmasa) 
    // barcha mahsulotlarni majburiy ravishda default holatga qaytaramiz
    if (parsed && parsed.length > 0 && (!parsed[0].image || !parsed[0].image.includes('unsplash.com'))) {
       parsed = null;
    }
    
    // Agar foydalanuvchida eski kamroq (6 ta) mahsulot qolib ketgan bo'lsa yangi (12 ta) ni yuklash
    if (parsed && parsed.length < 12) {
       parsed = null;
    }
    
    return parsed || defaultProducts;
  });
  useEffect(() => localStorage.setItem('products', JSON.stringify(products)), [products]);

  // Cart & Favorites
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('favorites', JSON.stringify(favorites)), [favorites]);

  const toggleFav = (product) => {
    setFavorites(prev => {
      const exist = prev.find(p => p.id === product.id);
      if (exist) {
        toast.success(`${product.name} saralanganlardan o'chirildi`, { icon: '💔' });
        return prev.filter(p => p.id !== product.id);
      }
      toast.success(`${product.name} saralanganlarga qo'shildi`, { icon: '❤️' });
      return [...prev, product];
    });
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        toast.success(`${product.name} soni ko'paytirildi`);
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      toast.success(`${product.name} savatga qo'shildi`);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const clearCart = () => setCart([]);

  const formatPrice = (price) => {
    if (lang === 'ru') return `${Math.round(price / 150).toLocaleString()} ₽`;
    if (lang === 'en') return `$${(price / 12800).toFixed(2)}`;
    return `${price.toLocaleString()} so'm`;
  };

  return (
    <StoreContext.Provider value={{
      theme, toggleTheme,
      lang, setLang, t, formatPrice,
      user, login, logout,
      products, setProducts,
      cart, addToCart, removeFromCart, clearCart,
      favorites, toggleFav
    }}>
      {children}
    </StoreContext.Provider>
  );
};
