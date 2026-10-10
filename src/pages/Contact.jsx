import React, { useState } from 'react';
import { useStore } from '../Context';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Contact() {
  const { t } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', msg: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Xabaringiz yuborildi! Tez orada aloqaga chiqamiz.');
    setFormData({ name: '', email: '', msg: '' });
  };

  return (
    <div className="w-full flex-1 pb-20">
      <div className="relative h-[300px] w-full flex items-center justify-center overflow-hidden mb-16">
        <div className="absolute inset-0 bg-neutral-900">
          <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1600&q=80" alt="Contact Hero" className="w-full h-full object-cover opacity-40" />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-5xl font-black text-white text-center uppercase tracking-widest"
        >
          {t.contact}
        </motion.h1>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6 dark:text-white">Biz bilan bog'lanish</h2>
              <div className="space-y-6 text-lg text-neutral-600 dark:text-neutral-400">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-full flex items-center justify-center shrink-0">📞</div>
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Telefon</h3>
                    <p>+998 90 123 45 67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-full flex items-center justify-center shrink-0">✉️</div>
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Email</h3>
                    <p>info@kicksstore.uz</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-full flex items-center justify-center shrink-0">📍</div>
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Manzil</h3>
                    <p>Toshkent shahar, Yunusobod tumani, Amir Temur ko'chasi 108-uy</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-3xl overflow-hidden h-80 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.53930491826!2d69.28186191566827!3d41.34062087926792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b5341a0210f%3A0xc49b77cb28d447a2!2sAmir%20Temur%20Avenue%2C%20Tashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1655112233445!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-10 shadow-sm h-fit">
            <h2 className="text-3xl font-bold mb-2 dark:text-white">Xabar yuborish</h2>
            <p className="text-neutral-500 mb-8">Savol yoki takliflaringiz bo'lsa formani to'ldiring.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-neutral-300">Ismingiz</label>
                <input 
                  type="text" required
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-orange-500 dark:text-white transition-colors"
                  placeholder="Ali Valiyev"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-neutral-300">Email</label>
                <input 
                  type="email" required
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-orange-500 dark:text-white transition-colors"
                  placeholder="ali@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-neutral-300">Xabar matni</label>
                <textarea 
                  required rows="5"
                  value={formData.msg} onChange={e => setFormData({...formData, msg: e.target.value})}
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-orange-500 dark:text-white transition-colors resize-none"
                  placeholder="Xabaringizni yozing..."
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 text-lg">
                Yuborish
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
