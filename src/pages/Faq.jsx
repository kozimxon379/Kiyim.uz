import React, { useState } from 'react';
import { useStore } from '../Context';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Faq() {
  const { t } = useStore();
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState('');

  const faqs = [
    { q: "Yetkazib berish qancha vaqt oladi?", a: "Toshkent shahar ichida 1 kun, viloyatlarga 2-3 ish kuni davomida yetkaziladi." },
    { q: "Mahsulotni qaytara olamanmi?", a: "Ha, agar mahsulot o'lchami to'g'ri kelmasa yoki sizga yoqmasa, 10 kun ichida qaytarishingiz mumkin." },
    { q: "Original krossovkalarmi?", a: "Ha, biz faqatgina rasmiy dilerlardan kelgan 100% original mahsulotlarni sotamiz. Barcha mahsulotlarning sertifikatlari mavjud." },
    { q: "To'lov qanday amalga oshiriladi?", a: "To'lovni mahsulotni qabul qilib olgandan keyin naqd, Payme, Click yoki Uzcard/Humo orqali amalga oshirishingiz mumkin." },
    { q: "Chegirmalar mavjudmi?", a: "Ha, doimiy mijozlarimiz uchun maxsus promokodlar va bayramlarda katta chegirmalar e'lon qilib boriladi." },
    { q: "Chet elga dastavka bormi?", a: "Hozircha yetkazib berish xizmati faqat O'zbekiston Respublikasi hududida ishlamoqda. Kelajakda Qozog'iston va Qirg'izistonga ham yetkazishni reja qilganmiz." },
  ];

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 w-full flex-1">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-6 dark:text-white uppercase">{t.faq}</h1>
        <p className="text-neutral-500 text-lg max-w-2xl mx-auto">Sizni qiziqtirgan barcha savollarga shu yerdan javob topishingiz mumkin. Agar javob topa olmasangiz, biz bilan bevosita bog'laning.</p>
      </motion.div>
      
      <div className="mb-10 max-w-2xl mx-auto relative">
        <input 
          type="text" 
          placeholder="Savolingizni qidiring..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 dark:text-white shadow-sm"
        />
      </div>

      <div className="space-y-4 mb-20 max-w-3xl mx-auto">
        {filteredFaqs.length === 0 && (
          <p className="text-center text-neutral-500 py-10">Hech narsa topilmadi...</p>
        )}
        {filteredFaqs.map((faq, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={index} 
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button 
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
            >
              <span className="font-bold text-lg dark:text-white pr-8">{faq.q}</span>
              <span className={`text-orange-500 font-black text-2xl transition-transform ${open === index ? 'rotate-45' : ''}`}>+</span>
            </button>
            <AnimatePresence>
              {open === index && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-5 text-neutral-600 dark:text-neutral-400 leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }}
        className="bg-orange-500 rounded-3xl p-10 text-center text-white shadow-xl shadow-orange-500/20"
      >
        <h2 className="text-3xl font-black mb-4">O'z savolingizga javob topmadingizmi?</h2>
        <p className="text-orange-100 mb-8 text-lg">Bizning operatorlarimiz sizga yordam berishdan xursand bo'lishadi.</p>
        <Link to="/contact" className="inline-block bg-white text-orange-500 font-bold px-8 py-4 rounded-full hover:bg-neutral-100 transition shadow-lg">
          Biz bilan bog'lanish
        </Link>
      </motion.div>
    </div>
  );
}
