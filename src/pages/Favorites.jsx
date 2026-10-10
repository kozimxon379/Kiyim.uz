import React from 'react';
import { useStore } from '../Context';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { t, favorites, toggleFav, addToCart, formatPrice } = useStore();

  if (favorites.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
        <Heart size={64} className="text-neutral-300 dark:text-neutral-700 mb-6" />
        <h2 className="text-2xl font-bold dark:text-white mb-2">{t.emptyFav}</h2>
        <Link to="/shop" className="text-orange-500 font-bold hover:underline">Do'konga qaytish</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full">
      <h1 className="text-3xl font-black text-neutral-900 dark:text-white mb-8">{t.favorites}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map(item => (
          <div key={item.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden hover:border-orange-500/50 transition flex flex-col justify-between group">
            <div className="relative overflow-hidden">
              <button
                onClick={() => toggleFav(item)}
                className="absolute top-4 right-4 bg-white/70 dark:bg-black/50 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition z-10"
              >
                <Heart size={18} fill="#f97316" color="#f97316" />
              </button>
              <img src={item.image} alt={item.name} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" />
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight mb-2">{item.name}</h3>
              <p className="text-orange-500 font-extrabold text-lg mt-auto">{formatPrice(item.price)}</p>
            </div>

            <div className="p-5 pt-0 mt-auto">
              <button
                onClick={() => addToCart(item)}
                className="w-full flex items-center justify-center gap-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold py-3 rounded-2xl hover:bg-orange-500 hover:text-white transition"
              >
                <ShoppingCart size={18} /> {t.addToCart}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
