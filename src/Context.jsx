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
  const [orders, setOrders] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('orders'));
    return (saved && saved.length >= 3) ? saved : [
      { id: 101, date: '10.10.2026', customer: 'Sardor', phone: '+998 90 123 45 67', total: 1560000, items: 2, status: 'Yangi' },
      { id: 102, date: '09.10.2026', customer: 'Kozimxon', phone: '+998 99 765 43 21', total: 4250000, items: 3, status: 'Yetkazilmoqda' },
      { id: 103, date: '08.10.2026', customer: 'Aziza', phone: '+998 93 111 22 33', total: 850000, items: 1, status: 'Yakunlangan' }
    ];
  });
  
  const [customers, setCustomers] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('customers'));
    return (saved && saved.length >= 3) ? saved : [
      { id: 1, name: 'Sardor', phone: '+998 90 123 45 67', ordersCount: 2, totalSpent: 1560000, joined: '01.10.2026' },
      { id: 2, name: 'Kozimxon', phone: '+998 99 765 43 21', ordersCount: 5, totalSpent: 5250000, joined: '15.09.2026' },
      { id: 3, name: 'Aziza', phone: '+998 93 111 22 33', ordersCount: 1, totalSpent: 850000, joined: '10.10.2026' }
    ];
  });
  
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('customers', JSON.stringify(customers)), [customers]);

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
      favorites, toggleFav,
      orders, setOrders,
      customers, setCustomers
    }}>
      {children}
    </StoreContext.Provider>
  );
};
