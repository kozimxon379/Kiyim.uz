import React, { useState } from 'react';
import { useStore } from '../Context';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const { login, t } = useStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      toast.success('Tizimga kirdingiz', { icon: '👋' });
      if (username === 'islomxonovkozim@gmail.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError("Login yoki parol noto'g'ri");
      toast.error("Login yoki parol noto'g'ri");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 w-full">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-sm">
        <h1 className="text-3xl font-black mb-6 text-center dark:text-white">{t.login}</h1>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-500 dark:text-neutral-400 mb-1">Email / Telefon</label>
            <input 
              required 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="w-full border border-neutral-300 dark:border-neutral-700 bg-transparent rounded-xl px-4 py-3 dark:text-white outline-none focus:border-orange-500 transition" 
              placeholder="islomxonovkozim@gmail.com"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-500 dark:text-neutral-400 mb-1">Parol</label>
            <input 
              required 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full border border-neutral-300 dark:border-neutral-700 bg-transparent rounded-xl px-4 py-3 dark:text-white outline-none focus:border-orange-500 transition" 
              placeholder="******"
            />
          </div>
          
          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 mt-4">
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
}
