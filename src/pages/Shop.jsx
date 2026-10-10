import React, { useState, useMemo } from 'react';
import { useStore } from '../Context';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Shop() {
  const { t, products, addToCart, favorites, toggleFav, formatPrice } = useStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('none');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let result = products;
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    if (sort === 'asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, search, category, sort]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-black text-neutral-900 dark:text-white">{t.shop}</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder={t.search} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-full pl-10 pr-4 py-2 outline-none focus:border-orange-500"
            />
            <Search className="absolute left-3 top-2.5 text-neutral-400" size={18} />
          </div>

          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-full px-4 py-2 outline-none focus:border-orange-500"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'All' ? t.all : c}</option>
            ))}
          </select>

          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-full px-4 py-2 outline-none focus:border-orange-500"
          >
            <option value="none">Odatdagi</option>
            <option value="asc">{t.sortAsc}</option>
            <option value="desc">{t.sortDesc}</option>
          </select>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item, index) => {
          const isFav = favorites.some(f => f.id === item.id);
          return (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={item.id} 
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden hover:border-orange-500/50 transition flex flex-col justify-between group"
            >
              <div className="relative overflow-hidden">
                <span className="absolute top-4 left-4 bg-orange-500 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase z-10">
                  {item.badge}
                </span>
                <button
                  onClick={() => toggleFav(item)}
                  className="absolute top-4 right-4 bg-white/70 dark:bg-black/50 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition z-10"
                >
                  <Heart size={18} fill={isFav ? '#f97316' : 'none'} color={isFav ? '#f97316' : 'currentColor'} className="text-neutral-900 dark:text-white" />
                </button>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&q=80'; }}
                />
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <span className="text-xs uppercase font-semibold text-neutral-500 mb-1">{item.category}</span>
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
            </motion.div>
          );
        })}
      </motion.div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-neutral-500">Mahsulot topilmadi...</div>
      )}
    </div>
  );
}
