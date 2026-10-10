import React, { useState } from 'react';
import { useStore } from '../Context';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Admin() {
  const { user, products, setProducts, logout, t, formatPrice } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: '', name: '', price: '', image: '', badge: '', category: '' });
  const [isEditing, setIsEditing] = useState(false);

  if (!user || user.role !== 'admin') {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Kirish taqiqlangan</h1>
        <button onClick={() => navigate('/login')} className="text-orange-500 underline">Tizimga kiring</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map(p => p.id === form.id ? { ...form, price: Number(form.price) } : p));
      toast.success('Mahsulot saqlandi');
    } else {
      setProducts([...products, { ...form, id: Date.now(), price: Number(form.price) }]);
      toast.success('Yangi mahsulot qo\'shildi');
    }
    setForm({ id: '', name: '', price: '', image: '', badge: '', category: '' });
    setIsEditing(false);
  };

  const handleEdit = (p) => {
    setForm(p);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
      setProducts(products.filter(p => p.id !== id));
      toast.success('Mahsulot o\'chirildi', { icon: '🗑️' });
    }
  };

  const handleReset = () => {
    if (window.confirm("Barcha mahsulotlarni boshlang'ich holatiga (Krossovkalar) qaytarmoqchimisiz? Oldingi ma'lumotlar o'chadi!")) {
      import('../data').then(module => {
        setProducts(module.defaultProducts);
        toast.success('Mahsulotlar asliga qaytarildi', { icon: '🔄' });
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-1">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-black dark:text-white uppercase">Admin Dashboard</h1>
        <div className="flex space-x-3">
          <button onClick={handleReset} className="bg-neutral-800 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-neutral-700 shadow-md transition-colors text-sm">Mahsulotlarni Tiklash</button>
          <button onClick={() => { logout(); navigate('/'); }} className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-600 shadow-md transition-colors text-sm shadow-red-500/20">{t.logout}</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm h-fit">
          <h2 className="text-2xl font-black mb-6 dark:text-white">{isEditing ? 'Mahsulotni Tahrirlash' : 'Yangi Mahsulot'}</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Nomi</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 dark:text-white outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" />
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Narxi (so'm)</label>
              <input required type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 dark:text-white outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" />
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Rasm URL</label>
              <input required value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 dark:text-white outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Badge</label>
                <input required placeholder="Hit/Yangi" value={form.badge} onChange={e => setForm({...form, badge: e.target.value})} className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 dark:text-white outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Kategoriya</label>
                <input required placeholder="Sport..." value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 dark:text-white outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-orange-500 text-white font-black py-4 rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 text-lg mt-4">
              {isEditing ? 'Saqlash' : 'Qo\'shish'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setForm({ id: '', name: '', price: '', image: '', badge: '', category: '' }) }} className="w-full bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold py-3 rounded-xl transition hover:bg-neutral-300 dark:hover:bg-neutral-700">
                Bekor qilish
              </button>
            )}
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-neutral-50 dark:bg-neutral-950">
                  <tr className="border-b dark:border-neutral-800 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Rasm</th>
                    <th className="py-4 px-6">Nomi</th>
                    <th className="py-4 px-6">Narxi</th>
                    <th className="py-4 px-6 text-right">Harakatlar</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {products.map((p, i) => (
                      <motion.tr 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.05 }}
                        key={p.id} 
                        className="border-b dark:border-neutral-800 last:border-0 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors group"
                      >
                        <td className="py-4 px-6">
                          <img src={p.image} alt={p.name} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&q=80'; }} className="w-14 h-14 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                        </td>
                        <td className="py-4 px-6 font-bold text-lg">{p.name}</td>
                        <td className="py-4 px-6 text-orange-500 font-black">{formatPrice(p.price)}</td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end space-x-2">
                            <button onClick={() => handleEdit(p)} className="p-2 bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white dark:bg-blue-500/10 dark:hover:bg-blue-500 rounded-lg transition" title="Tahrirlash">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(p.id)} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white dark:bg-red-500/10 dark:hover:bg-red-500 rounded-lg transition" title="O'chirish">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
