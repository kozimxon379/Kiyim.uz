import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../Context';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Home() {
  const { t } = useStore();

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1600&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60 dark:opacity-40"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-md">
            {t.homeTitle} <span className="text-orange-500">{t.homeSubTitle}</span>
          </h1>
          <p className="text-xl text-neutral-200 mb-10">
            {t.home} - {t.homeDesc}
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/shop" className="bg-orange-500 text-white font-bold py-4 px-8 rounded-full hover:bg-orange-600 transition shadow-lg shadow-orange-500/30">
              {t.shop}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-neutral-100 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="p-8 bg-white dark:bg-neutral-950 rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-800">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">{t.feature1Title}</h3>
            <p className="text-neutral-500 dark:text-neutral-400">{t.feature1Desc}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="p-8 bg-white dark:bg-neutral-950 rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-800">
            <div className="text-4xl mb-4">💯</div>
            <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">{t.feature2Title}</h3>
            <p className="text-neutral-500 dark:text-neutral-400">{t.feature2Desc}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="p-8 bg-white dark:bg-neutral-950 rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-800">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">{t.feature3Title}</h3>
            <p className="text-neutral-500 dark:text-neutral-400">{t.feature3Desc}</p>
          </motion.div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-neutral-900 dark:text-white">{t.categoriesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/shop" className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer block">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500 z-10"></div>
              <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80" alt="Streetwear" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <h3 className="absolute bottom-8 left-8 text-3xl font-bold text-white z-20">Streetwear</h3>
            </Link>
            <Link to="/shop" className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer block">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500 z-10"></div>
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" alt="Sport" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <h3 className="absolute bottom-8 left-8 text-3xl font-bold text-white z-20">Sport</h3>
            </Link>
            <Link to="/shop" className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer block">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500 z-10"></div>
              <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80" alt="Classic" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <h3 className="absolute bottom-8 left-8 text-3xl font-bold text-white z-20">Classic</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* About Info Split */}
      <section className="py-20 bg-white dark:bg-neutral-950 border-t border-b border-neutral-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex-1 w-full">
            <img src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1000&q=80" alt="About us" className="rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex-1 space-y-6">
            <h2 className="text-4xl font-black text-neutral-900 dark:text-white">{t.aboutTitle}</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t.aboutDesc}
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-neutral-800 dark:text-neutral-300">
                <span className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">✓</span> {t.aboutLi1}
              </li>
              <li className="flex items-center gap-3 text-neutral-800 dark:text-neutral-300">
                <span className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">✓</span> {t.aboutLi2}
              </li>
              <li className="flex items-center gap-3 text-neutral-800 dark:text-neutral-300">
                <span className="bg-orange-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">✓</span> {t.aboutLi3}
              </li>
            </ul>
            <div className="pt-4">
              <Link to="/contact" className="text-orange-500 font-bold hover:underline border-b-2 border-orange-500 pb-1 uppercase tracking-wide text-sm">{t.contactUsLink}</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-orange-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-black text-white mb-4">{t.newsTitle}</h2>
          <p className="text-orange-100 mb-8 text-lg">{t.newsDesc}</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => { e.preventDefault(); toast.success('Obuna bo\'ldingiz!', {icon: '📩'}); }}>
            <input type="email" placeholder={t.emailPlace} required className="flex-1 px-6 py-4 rounded-full text-neutral-900 outline-none shadow-xl" />
            <button type="submit" className="bg-neutral-900 text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition shadow-xl">{t.subscribe}</button>
          </form>
        </div>
      </section>
    </div>
  );
}
