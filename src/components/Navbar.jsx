'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { 
  FaMicrochip, FaBars, FaSun, FaMoon, 
  FaBoxOpen, FaPlusCircle, FaUser, FaCog, FaSignOutAlt 
} from 'react-icons/fa';

export default function Navbar() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [theme, setTheme] = useState('tech-gear');

  // Check Auth & Initialize Theme
  useEffect(() => {
    // 1. Check Auth
    if (Cookies.get('mock_token')) setIsAuth(true);

    // 2. Check System/Local Storage Theme (Optional)
    const storedTheme = localStorage.getItem('theme') || 'tech-gear';
    setTheme(storedTheme);
    document.querySelector('html').setAttribute('data-theme', storedTheme);
  }, []);

  // Toggle Theme Function
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

  // Navigation Links Data
  const publicLinks = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/items' },
    { name: 'About', href: '/about' }, // You can create this page later
  ];

  const protectedLinks = [
    { name: 'Add Item', href: '/add-item', icon: FaPlusCircle },
    { name: 'Dashboard', href: '/dashboard', icon: FaBoxOpen }, // Placeholder
    { name: 'Profile', href: '/profile', icon: FaUser },       // Placeholder
    { name: 'Settings', href: '/settings', icon: FaCog },      // Placeholder
  ];

  return (
    <div className="sticky top-0 z-50 w-full navbar bg-base-100/95 backdrop-blur-md border-b border-base-200 shadow-sm transition-all duration-300">
      
      {/* --- LEFT: Mobile Menu & Logo --- */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <FaBars className="h-5 w-5" />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {publicLinks.map((link) => (
              <li key={link.name}><Link href={link.href}>{link.name}</Link></li>
            ))}
            {isAuth && (
              <>
                <div className="divider my-1"></div>
                {protectedLinks.map((link) => (
                  <li key={link.name}><Link href={link.href}>{link.name}</Link></li>
                ))}
              </>
            )}
          </ul>
        </div>
        
        {/* Logo */}
        <Link href="/" className="btn btn-ghost text-xl md:text-2xl font-black tracking-tight text-primary gap-2">
          <FaMicrochip className="text-secondary" /> 
          <span className="hidden sm:inline">TechGear</span>
        </Link>
      </div>

      {/* --- CENTER: Desktop Menu --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          {publicLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-primary transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
          {/* Show 'Add Item' directly in navbar if logged in for quick access */}
          {isAuth && (
            <li>
              <Link href="/add-item" className="text-secondary hover:bg-secondary/10">
                <FaPlusCircle /> Add Item
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* --- RIGHT: Theme & Auth --- */}
      <div className="navbar-end gap-3">
        
        {/* Theme Controller Toggle */}
        <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
          <input type="checkbox" onChange={toggleTheme} checked={theme === 'light'} />
          <FaSun className="swap-on fill-current w-5 h-5 text-yellow-500" />
          <FaMoon className="swap-off fill-current w-5 h-5 text-primary" />
        </label>

        {isAuth ? (
          /* AUTH STATE: User Avatar Dropdown */
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2">
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li className="menu-title">User Options</li>
              <li><Link href="/profile" className="justify-between">Profile <span className="badge badge-accent">New</span></Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/settings">Settings</Link></li>
              <div className="divider my-0"></div> 
              <li><button onClick={handleLogout} className="text-error"><FaSignOutAlt /> Logout</button></li>
            </ul>
          </div>
        ) : (
          /* UNAUTH STATE: Login Button */
          <Link href="/login" className="btn btn-primary btn-sm md:btn-md shadow-md hover:shadow-lg transition-all">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}