import React, { useState, useEffect } from 'react';
import { useStore } from '../Context';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, LayoutDashboard, ShoppingCart, Users, Home, LogOut, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Admin() {
  const { user, products, setProducts, logout, t, formatPrice, orders, setOrders, customers, setCustomers } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: '', name: '', price: '', image: '', badge: '', category: '' });
  const [isEditing, setIsEditing] = useState(false);
  
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('adminTab') || 'products');

  useEffect(() => {
    localStorage.setItem('adminTab', activeTab);
  }, [activeTab]);

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
    toast.custom((tToast) => (
      <div className={`${tToast.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-white dark:bg-neutral-900 shadow-2xl rounded-3xl p-6 pointer-events-auto flex flex-col border border-neutral-100 dark:border-neutral-800`}>
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-red-100 dark:bg-red-500/20 text-red-500 p-3 rounded-2xl shrink-0">
            <Trash2 size={24} />
          </div>
          <div>
            <h3 className="font-black text-lg dark:text-white">O'chirishni tasdiqlang</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Rostdan ham ushbu mahsulotni ro'yxatdan butunlay o'chirib tashlamoqchimisiz?</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.dismiss(tToast.id)} className="flex-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-bold py-3 rounded-xl transition-colors">
            Bekor qilish
          </button>
          <button onClick={() => {
            setProducts(products.filter(p => p.id !== id));
            toast.dismiss(tToast.id);
            toast.success('Mahsulot o\'chirildi', { icon: '🗑️' });
          }} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-500/20">
            Ha, o'chirish
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const handleReset = () => {
    toast.custom((tToast) => (
      <div className={`${tToast.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-white dark:bg-neutral-900 shadow-2xl rounded-3xl p-6 pointer-events-auto flex flex-col border border-neutral-100 dark:border-neutral-800`}>
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-orange-100 dark:bg-orange-500/20 text-orange-500 p-3 rounded-2xl shrink-0">
            <Edit size={24} />
          </div>
          <div>
            <h3 className="font-black text-lg dark:text-white">Tiklashni tasdiqlang</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Barcha mahsulotlarni boshlang'ich holatiga qaytarmoqchimisiz? Oldingi ma'lumotlar o'chadi!</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.dismiss(tToast.id)} className="flex-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-bold py-3 rounded-xl transition-colors">
            Bekor qilish
          </button>
          <button onClick={() => {
            import('../data').then(module => {
              setProducts(module.defaultProducts);
              toast.dismiss(tToast.id);
              toast.success('Mahsulotlar asliga qaytarildi', { icon: '🔄' });
            });
          }} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20">
            Tiklash
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-[1500px] mx-auto w-full flex-1 gap-6 p-4 lg:p-8">
      {/* Sidebar */}
      <motion.aside initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="lg:w-64 shrink-0 bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col gap-2 h-fit">
        <h2 className="text-xl font-black mb-6 dark:text-white px-2">KICKS ADMIN</h2>
        <button onClick={() => setActiveTab('products')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === 'products' ? 'text-orange-500 bg-orange-50 dark:bg-orange-500/10' : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'}`}>
          <LayoutDashboard size={20} />
          Mahsulotlar
        </button>
        <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === 'orders' ? 'text-orange-500 bg-orange-50 dark:bg-orange-500/10' : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'}`}>
          <Package size={20} />
          Omborxona ({orders.length})
        </button>
        <button onClick={() => setActiveTab('customers')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === 'customers' ? 'text-orange-500 bg-orange-50 dark:bg-orange-500/10' : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'}`}>
          <Users size={20} />
          Mijozlar ({customers.length})
        </button>
        
        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-2">
          <button onClick={handleReset} className="flex items-center gap-3 w-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white px-4 py-3 rounded-xl font-bold transition">
            <Edit size={20} />
            Bazani tiklash
          </button>
          <button onClick={() => navigate('/')} className="flex items-center gap-3 w-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white px-4 py-3 rounded-xl font-bold transition">
            <Home size={20} />
            Do'konga qaytish
          </button>
          <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-3 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 px-4 py-3 rounded-xl font-bold transition mt-2">
            <LogOut size={20} />
            Tizimdan chiqish
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-between items-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm">
          <h1 className="text-2xl font-black dark:text-white uppercase">
            {activeTab === 'products' ? 'Mahsulotlar Boshqaruvi' : activeTab === 'orders' ? 'Omborxona' : 'Mijozlar Ro\'yxati'}
          </h1>
          {activeTab === 'products' && (
            <div className="text-sm font-bold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-lg">
              Jami: {products.length} ta
            </div>
          )}
        </motion.div>

        {activeTab === 'products' ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="xl:col-span-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm h-fit sticky top-6">
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

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="xl:col-span-2">
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
        ) : activeTab === 'orders' && orders.length > 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm overflow-hidden min-h-[400px]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-neutral-50 dark:bg-neutral-950">
                  <tr className="border-b dark:border-neutral-800 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    <th className="py-4 px-6">ID</th>
                    <th className="py-4 px-6">Sana</th>
                    <th className="py-4 px-6">Xaridor</th>
                    <th className="py-4 px-6">Telefon</th>
                    <th className="py-4 px-6">Mahsulotlar</th>
                    <th className="py-4 px-6">Jami summa</th>
                    <th className="py-4 px-6 text-right">Holati</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {orders.map((o, i) => (
                      <motion.tr 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={o.id} 
                        className="border-b dark:border-neutral-800 last:border-0 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors"
                      >
                        <td className="py-4 px-6 font-bold">#{o.id}</td>
                        <td className="py-4 px-6 text-neutral-500 dark:text-neutral-400">{o.date}</td>
                        <td className="py-4 px-6 font-bold">{o.customer}</td>
                        <td className="py-4 px-6">{o.phone}</td>
                        <td className="py-4 px-6 font-medium">{o.items} dona</td>
                        <td className="py-4 px-6 text-orange-500 font-black">{formatPrice(o.total)}</td>
                        <td className="py-4 px-6 text-right">
                          <span className="bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide">
                            {o.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : activeTab === 'customers' && customers.length > 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm overflow-hidden min-h-[400px]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-neutral-50 dark:bg-neutral-950">
                  <tr className="border-b dark:border-neutral-800 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    <th className="py-4 px-6">ID</th>
                    <th className="py-4 px-6">Ism</th>
                    <th className="py-4 px-6">Telefon</th>
                    <th className="py-4 px-6">Buyurtmalar</th>
                    <th className="py-4 px-6">Xarajatlar</th>
                    <th className="py-4 px-6 text-right">Qo'shilgan sana</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {customers.map((c, i) => (
                      <motion.tr 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={c.id} 
                        className="border-b dark:border-neutral-800 last:border-0 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors"
                      >
                        <td className="py-4 px-6 font-bold">#{c.id}</td>
                        <td className="py-4 px-6 font-bold text-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-500/20 text-orange-500 flex items-center justify-center rounded-full font-black">
                              {c.name.charAt(0).toUpperCase()}
                            </div>
                            {c.name}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-neutral-500 dark:text-neutral-400">{c.phone}</td>
                        <td className="py-4 px-6 font-medium">{c.ordersCount} marta</td>
                        <td className="py-4 px-6 text-orange-500 font-black">{formatPrice(c.totalSpent)}</td>
                        <td className="py-4 px-6 text-right text-neutral-500 dark:text-neutral-400">{c.joined}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-12 text-center min-h-[400px]">
            <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-full mb-6">
              {activeTab === 'orders' ? <Package size={48} className="text-neutral-400" /> : <Users size={48} className="text-neutral-400" />}
            </div>
            <h2 className="text-2xl font-black dark:text-white mb-2">Hozircha bo'sh</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-md">
              Hali bu yerda hech qanday ma'lumot yo'q. Omborxonaga kiruvchi yangi ma'lumotlar {activeTab === 'orders' ? 'shu yerda' : 'mijozlar bo\'limida'} paydo bo'ladi.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
