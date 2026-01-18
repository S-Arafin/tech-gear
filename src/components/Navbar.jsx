'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext'; // Import Context
import { 
  FaMicrochip, FaBars, FaSun, FaMoon, 
  FaBoxOpen, FaPlusCircle, FaUser, FaCog, FaSignOutAlt, FaShoppingCart 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const router = useRouter();
  const { toggleCart, cartCount } = useCart(); // Use Context
  const [isAuth, setIsAuth] = useState(false);
  const [theme, setTheme] = useState('tech-gear');

  useEffect(() => {
    if (Cookies.get('mock_token')) setIsAuth(true);
    const storedTheme = localStorage.getItem('theme') || 'tech-gear';
    setTheme(storedTheme);
    document.querySelector('html').setAttribute('data-theme', storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'tech-gear' ? 'light' : 'tech-gear';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.querySelector('html').setAttribute('data-theme', newTheme);
  };

  const handleLogout = () => {
    Cookies.remove('mock_token');
    setIsAuth(false);
    router.push('/');
    router.refresh();
  };

  const publicLinks = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/items' },
  ];

  return (
    <div className="sticky top-0 z-40 w-full navbar bg-base-100/80 backdrop-blur-md border-b border-base-content/10 shadow-sm">
      
      {/* --- LEFT --- */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <FaBars className="h-5 w-5" />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {publicLinks.map((link) => (
              <li key={link.name}><Link href={link.href}>{link.name}</Link></li>
            ))}
             {isAuth && <li><Link href="/add-item">Add Item</Link></li>}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-black text-primary gap-2">
          <FaMicrochip className="text-secondary" /> TechGear
        </Link>
      </div>

      {/* --- CENTER --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          {publicLinks.map((link) => (
            <li key={link.name}><Link href={link.href}>{link.name}</Link></li>
          ))}
          {isAuth && <li><Link href="/add-item"><FaPlusCircle className="text-secondary"/> Add Item</Link></li>}
        </ul>
      </div>

      {/* --- RIGHT --- */}
      <div className="navbar-end gap-3">
        
        {/* THEME TOGGLE */}
        <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
          <input type="checkbox" onChange={toggleTheme} checked={theme === 'light'} />
          <FaSun className="swap-on text-yellow-500 w-5 h-5" />
          <FaMoon className="swap-off text-primary w-5 h-5" />
        </label>

        {/* CART ICON (New) */}
        <button className="btn btn-ghost btn-circle" onClick={toggleCart}>
          <div className="indicator">
            <FaShoppingCart className="h-5 w-5" />
            <AnimatePresence>
                {cartCount > 0 && (
                    <motion.span 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        exit={{ scale: 0 }}
                        className="badge badge-sm badge-secondary indicator-item"
                    >
                        {cartCount}
                    </motion.span>
                )}
            </AnimatePresence>
          </div>
        </button>

        {/* AUTH */}
        {isAuth ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-2">
              <div className="w-10 rounded-full">
                <img alt="Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li><Link href="/add-item">Add Item</Link></li>
              <li><button onClick={handleLogout} className="text-error"><FaSignOutAlt /> Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
        )}
      </div>
    </div>
  );
}