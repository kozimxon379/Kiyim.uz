import React, { useState } from 'react';
import { useStore } from '../Context';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Cart() {
  const { t, cart, removeFromCart, clearCart, formatPrice } = useStore();
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const total = subtotal - (subtotal * discount / 100);

  const applyPromo = () => {
    if (promo.toUpperCase() === 'KICKS10') {
      setDiscount(10);
      toast.success('10% chegirma qo\'llanildi!', { icon: '🎉' });
    } else {
      toast.error(t.invalidPromo);
      setDiscount(0);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    if (!buyerName || !buyerPhone || !buyerAddress) {
      toast.error('Iltimos barcha ma\'lumotlarni kiriting!');
      return;
    }
    
    const BOT_TOKEN = '8936233153:AAFOV5VKw5vYicXXgVZbB8UvHV01QGKLJE8';
    const CHAT_ID = '6575332225';
    
    let caption = `🛒 <b>YANGI BUYURTMA!</b>\n\n`;
    
    if (cart.length === 1) {
      caption += `👟 <b>Mahsulot:</b> ${cart[0].name} x ${cart[0].qty}\n`;
    } else {
      caption += `👟 <b>Mahsulotlar:</b>\n`;
      cart.forEach((item, index) => {
        caption += `${index + 1}. ${item.name} x ${item.qty}\n`;
      });
    }
    
    caption += `💰 <b>Narxi:</b> ${formatPrice(total)}`;
    if (discount > 0) {
      caption += ` (Chegirma bilan)`;
    }
    
    caption += `\n\n👤 <b>Xaridor:</b> ${buyerName}\n📞 <b>Telefon:</b> ${buyerPhone}\n📍 <b>Manzil:</b> ${buyerAddress}`;

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          photo: cart[0].image,
          caption: caption,
          parse_mode: 'HTML'
        })
      });
      
      if (res.ok) {
        toast.success(t.orderSuccess, { duration: 4000 });
        clearCart();
      } else {
        toast.error("Xatolik yuz berdi");
      }
    } catch (error) {
      toast.error("Tarmoq xatosi");
    }
  };

  if (cart.length === 0) {
    return <div className="p-20 text-center text-2xl font-bold dark:text-white">{t.emptyCart}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full">
      <h1 className="text-3xl font-black mb-8 dark:text-white">{t.cart}</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-4 mb-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="font-bold dark:text-white">{item.name}</h3>
                <p className="text-sm text-neutral-500">{formatPrice(item.price)} x {item.qty}</p>
                <p className="font-bold text-orange-500">{formatPrice(item.price * item.qty)}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-96 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 h-fit shadow-sm">
          <h2 className="text-xl font-bold mb-4 dark:text-white">{t.checkout}</h2>
          
          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder={t.promo}
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="flex-1 border dark:border-neutral-700 bg-transparent rounded-xl px-4 py-2 outline-none dark:text-white focus:border-orange-500"
            />
            <button onClick={applyPromo} className="bg-neutral-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-xl font-bold">
              {t.apply}
            </button>
          </div>

          <div className="space-y-3 mb-6">
            <input 
              required
              type="text" 
              placeholder="Ismingiz (Xaridor)"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="w-full border dark:border-neutral-700 bg-transparent rounded-xl px-4 py-3 outline-none dark:text-white focus:border-orange-500 text-sm"
            />
            <input 
              required
              type="text" 
              placeholder="Telefon raqamingiz"
              value={buyerPhone}
              onChange={(e) => setBuyerPhone(e.target.value)}
              className="w-full border dark:border-neutral-700 bg-transparent rounded-xl px-4 py-3 outline-none dark:text-white focus:border-orange-500 text-sm"
            />
            <input 
              required
              type="text" 
              placeholder="Manzilingiz"
              value={buyerAddress}
              onChange={(e) => setBuyerAddress(e.target.value)}
              className="w-full border dark:border-neutral-700 bg-transparent rounded-xl px-4 py-3 outline-none dark:text-white focus:border-orange-500 text-sm"
            />
          </div>

          <div className="space-y-2 mb-6 text-sm dark:text-neutral-300">
            <div className="flex justify-between"><span>{t.total}:</span> <span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-green-500"><span>{t.discount} ({discount}%):</span> <span>-{formatPrice(subtotal * discount / 100)}</span></div>}
            <div className="flex justify-between font-bold text-lg pt-2 border-t dark:border-neutral-800">
              <span>{t.total}:</span> <span className="text-orange-500">{formatPrice(total)}</span>
            </div>
          </div>

          <button onClick={handleCheckout} className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition">
            {t.checkout}
          </button>
        </div>
      </div>
    </div>
  );
}
