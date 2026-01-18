'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { FaMicrochip } from 'react-icons/fa';

export default function Navbar() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (Cookies.get('mock_token')) setIsAuth(true);
  }, []);

  const handleLogout = () => {
    Cookies.remove('mock_token');
    setIsAuth(false);
    router.push('/');
    router.refresh();
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50" data-theme="tech-gear">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-2xl font-bold text-primary gap-2">
          <FaMicrochip /> TechGear
        </Link>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1 font-medium hidden md:flex">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/items">Catalog</Link></li>
            {isAuth && <li><Link href="/add-item">Add Item</Link></li>}
        </ul>
        
        {isAuth ? (
          <button onClick={handleLogout} className="btn btn-error btn-sm btn-outline">Logout</button>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
        )}
      </div>
    </div>
  );
}