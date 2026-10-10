import React, { useState } from 'react';
import { useStore } from '../Context';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

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
    <div className="max-w-7xl mx-auto px-6 py-10 w-full">
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-black dark:text-white">Admin Dashboard</h1>
        <div className="flex space-x-3">
          <button onClick={handleReset} className="bg-neutral-800 text-white px-4 py-2 rounded-xl font-bold hover:bg-neutral-700">Mahsulotlarni Tiklash</button>
          <button onClick={() => { logout(); navigate('/'); }} className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold">{t.logout}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4 dark:text-white">{isEditing ? 'Mahsulotni Tahrirlash' : 'Yangi Mahsulot Qo\'shish'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required placeholder="Nomi" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border dark:border-neutral-700 bg-transparent rounded-xl px-4 py-2 dark:text-white outline-none focus:border-orange-500" />
            <input required type="number" placeholder="Narxi" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full border dark:border-neutral-700 bg-transparent rounded-xl px-4 py-2 dark:text-white outline-none focus:border-orange-500" />
            <input required placeholder="Rasm URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full border dark:border-neutral-700 bg-transparent rounded-xl px-4 py-2 dark:text-white outline-none focus:border-orange-500" />
            <input required placeholder="Badge (Yangi, Hit, vs)" value={form.badge} onChange={e => setForm({...form, badge: e.target.value})} className="w-full border dark:border-neutral-700 bg-transparent rounded-xl px-4 py-2 dark:text-white outline-none focus:border-orange-500" />
            <input required placeholder="Kategoriya" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border dark:border-neutral-700 bg-transparent rounded-xl px-4 py-2 dark:text-white outline-none focus:border-orange-500" />
            
            <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition">
              {isEditing ? 'Saqlash' : 'Qo\'shish'}
            </button>
            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setForm({ id: '', name: '', price: '', image: '', badge: '', category: '' }) }} className="w-full bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold py-3 rounded-xl transition mt-2">
                Bekor qilish
              </button>
            )}
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b dark:border-neutral-800 dark:text-neutral-400">
                  <th className="py-3 px-4">Rasm</th>
                  <th className="py-3 px-4">Nomi</th>
                  <th className="py-3 px-4">Narxi</th>
                  <th className="py-3 px-4 text-right">Harakatlar</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b dark:border-neutral-800 last:border-0 dark:text-white">
                    <td className="py-3 px-4"><img src={p.image} alt={p.name} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&q=80'; }} className="w-12 h-12 rounded object-cover" /></td>
                    <td className="py-3 px-4 font-medium">{p.name}</td>
                    <td className="py-3 px-4 text-orange-500 font-bold">{formatPrice(p.price)}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-4">
                        <button onClick={() => handleEdit(p)} className="text-blue-500 hover:text-blue-400 transition" title="Tahrirlash">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-400 transition" title="O'chirish">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
