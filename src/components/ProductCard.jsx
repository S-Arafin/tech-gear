'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { FaEye, FaShoppingCart, FaStar } from 'react-icons/fa';

export default function ProductCard({ item }) {
  const { addToCart } = useCart();
  const displayName = item.name || item.productName || 'Untitled';
  const displayImage = item.imageUrl || item.image || "https://placehold.co/400";
  const displayStock = item.stock || item.stockQuantity || 0;
  
  const cartItem = { ...item, name: displayName, imageUrl: displayImage };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="card bg-base-100 w-full shadow-lg hover:shadow-2xl border border-transparent hover:border-primary/20 transition-all duration-300 group"
    >
      <figure className="h-64 bg-white relative overflow-hidden">
        <img 
          src={displayImage} // UPDATED
          alt={displayName} 
          className="object-contain w-full h-full p-6 transition-all duration-500 group-hover:scale-110 group-hover:blur-sm" 
        />
        
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-10">
             <Link href={`/items/${item._id}`} className="btn btn-wide btn-primary btn-sm gap-2">
                <FaEye /> View Details
             </Link>
             <button 
                onClick={(e) => { e.preventDefault(); addToCart(cartItem); }} 
                className="btn btn-wide btn-outline btn-white text-white btn-sm gap-2"
             >
                <FaShoppingCart /> Quick Add
             </button>
        </div>

        <div className="absolute top-3 left-3 flex gap-2 z-10">
             <div className="badge badge-primary font-medium shadow-sm">{item.category || 'Tech'}</div>
             {displayStock === 0 && <div className="badge badge-error text-white shadow-sm">Out of Stock</div>}
        </div>
      </figure>

      <div className="card-body p-5">
        <div className="flex justify-between items-start mb-1">
            <div className="text-xs uppercase font-bold text-base-content/50 tracking-wider">{item.brand || 'Generic'}</div>
            <div className="flex items-center text-yellow-500 text-xs gap-1">
                <FaStar /> {item.rating || 4.5}
            </div>
        </div>

        <Link href={`/items/${item._id}`} className="card-title text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors cursor-pointer">
            {displayName}
        </Link>
        
        <p className="text-sm text-base-content/70 line-clamp-2 min-h-[2.5rem]">
            {item.description}
        </p>

        <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-200">
          <div className="text-xl font-black text-primary">${item.price}</div>
          <button 
            onClick={() => addToCart(cartItem)} 
            className="btn btn-circle btn-ghost hover:bg-primary hover:text-white transition-colors"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
}