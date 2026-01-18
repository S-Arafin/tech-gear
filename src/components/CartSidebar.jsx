'use client';
import { useCart } from '@/context/CartContext';
import { FaTimes, FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CartSidebar() {
  const { isCartOpen, toggleCart, cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-base-100 z-[70] shadow-2xl flex flex-col border-l border-base-content/10"
          >
            <div className="p-5 border-b border-base-content/10 flex justify-between items-center bg-base-200/50">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaShoppingBag className="text-primary" /> Your Cart
              </h2>
              <button onClick={toggleCart} className="btn btn-circle btn-ghost btn-sm">
                <FaTimes />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                  <FaShoppingBag className="text-6xl text-base-content/20" />
                  <p>Your cart is empty.</p>
                  <button onClick={toggleCart} className="btn btn-outline btn-sm">Continue Shopping</button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    key={item._id} 
                    className="flex gap-4 bg-base-100 border border-base-content/10 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img 
                        src={item.imageUrl || item.image || "https://placehold.co/400"} 
                        className="w-20 h-20 object-contain bg-white rounded-lg p-2" 
                        alt={item.name} 
                    />
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold line-clamp-1 text-sm">{item.name}</h4>
                        <button onClick={() => removeFromCart(item._id)} className="text-error opacity-50 hover:opacity-100 transition-opacity">
                          <FaTrash size={14} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end">
                         <span className="text-primary font-bold">${(item.price * item.qty).toFixed(2)}</span>
                         
                         {/* Quantity Controls */}
                         <div className="flex items-center gap-2 bg-base-200 rounded-lg p-1">
                            <button 
                                onClick={() => updateQuantity(item._id, -1)} 
                                className="btn btn-xs btn-ghost btn-square"
                                disabled={item.qty <= 1}
                            >
                                <FaMinus size={10} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                            <button 
                                onClick={() => updateQuantity(item._id, 1)} 
                                className="btn btn-xs btn-ghost btn-square"
                            >
                                <FaPlus size={10} />
                            </button>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-6 bg-base-100 border-t border-base-content/10 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <Link 
                    href="/cart" 
                    onClick={toggleCart}
                    className="btn btn-primary w-full shadow-lg shadow-primary/20 group"
                >
                    Checkout Now <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
                </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}