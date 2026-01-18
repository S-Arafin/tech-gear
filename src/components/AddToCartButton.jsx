'use client';

import { useCart } from '@/context/CartContext';
import { FaShoppingCart, FaBolt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AddToCartButton({ item }) {
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    addToCart(item);
  };

  return (
    <div className="flex gap-4">
        <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(item)}
            className="btn btn-primary btn-lg flex-1 shadow-xl shadow-primary/20 transition-all gap-2"
        >
            <FaShoppingCart /> Add to Cart
        </motion.button>


        <motion.button 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.95 }}
             onClick={handleBuyNow}
             className="btn btn-outline btn-lg flex-1 gap-2"
        >
            <FaBolt /> Buy Now
        </motion.button>
    </div>
  );
}