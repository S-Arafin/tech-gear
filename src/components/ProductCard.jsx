'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

export default function ProductCard({ item }) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="card bg-base-100 w-full shadow-xl border border-base-200 hover:border-primary transition-all duration-300"
    >
      <figure className="h-64 bg-white p-6 relative overflow-hidden group">
        <img 
          src={item.imageUrl || "https://placehold.co/400"} 
          alt={item.name} 
          className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500" 
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onClick={() => addToCart(item)}
             className="btn btn-primary btn-sm"
           >
             Quick Add
           </button>
        </div>
      </figure>
      <div className="card-body p-5">
        <div className="flex justify-between items-start">
            <h2 className="card-title text-lg">{item.name}</h2>
            <div className="badge badge-secondary font-bold">${item.price}</div>
        </div>
        <p className="text-sm text-base-content/70 line-clamp-2">{item.description}</p>
        <div className="card-actions justify-end mt-4">
          <Link href={`/items/${item._id}`} className="btn btn-outline btn-sm btn-primary">Details</Link>
          <button onClick={() => addToCart(item)} className="btn btn-sm btn-primary">Add to Cart</button>
        </div>
      </div>
    </motion.div>
  );
}