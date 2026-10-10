import React from 'react';
import { useStore } from '../Context';
import { motion } from 'framer-motion';

export default function About() {
  const { t } = useStore();
  
  return (
    <div className="w-full flex-1 pb-20">
      {/* Hero */}
      <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0 bg-black">
          <img src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1600&q=80" alt="About Hero" className="w-full h-full object-cover opacity-50" />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-5xl md:text-7xl font-black text-white text-center uppercase tracking-widest"
        >
          {t.aboutUs}
        </motion.h1>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {/* Mission Section */}
        <section className="flex flex-col md:flex-row items-center gap-16">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1 space-y-6">
            <h2 className="text-4xl font-black dark:text-white uppercase">Bizning Missiyamiz</h2>
            <div className="w-20 h-1 bg-orange-500 rounded-full"></div>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Biz faqatgina krossovka sotmaymiz, biz insonlarga uslub, qulaylik va o'ziga ishonch ulashamiz. Har bir qadamda o'zingizni erkin his qilishingiz uchun dunyoning eng oldi brendlarini sizga yetkazib beramiz.
            </p>
            <p className="text-lg text-neutral-500 dark:text-neutral-500">
              {t.aboutDesc}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1 w-full">
            <img src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1000&q=80" alt="Mission" className="rounded-3xl shadow-2xl w-full h-[400px] object-cover" />
          </motion.div>
        </section>

        {/* Stats / Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm hover:shadow-xl transition-shadow group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🚀</div>
            <h3 className="font-black text-2xl mb-3 dark:text-white">{t.feature1Title}</h3>
            <p className="text-neutral-500">{t.feature1Desc}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm hover:shadow-xl transition-shadow group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">💯</div>
            <h3 className="font-black text-2xl mb-3 dark:text-white">{t.feature2Title}</h3>
            <p className="text-neutral-500">{t.feature2Desc}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm hover:shadow-xl transition-shadow group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🔄</div>
            <h3 className="font-black text-2xl mb-3 dark:text-white">{t.feature3Title}</h3>
            <p className="text-neutral-500">{t.feature3Desc}</p>
          </motion.div>
        </section>

        {/* Gallery */}
        <section className="space-y-10">
          <div className="text-center">
            <h2 className="text-4xl font-black dark:text-white uppercase mb-4">Galereya</h2>
            <p className="text-neutral-500">Do'konimiz va mahsulotlarimizdan lavhalar</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.img initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80" className="rounded-2xl h-64 w-full object-cover hover:scale-105 transition-transform duration-500" />
            <motion.img initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" className="rounded-2xl h-64 w-full object-cover hover:scale-105 transition-transform duration-500" />
            <motion.img initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} src="https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&q=80" className="rounded-2xl h-64 w-full object-cover hover:scale-105 transition-transform duration-500" />
            <motion.img initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80" className="rounded-2xl h-64 w-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </section>
      </div>
    </div>
  );
}
