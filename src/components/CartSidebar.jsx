'use client';
import { useCart } from '@/context/CartContext';
import { FaTimes, FaTrash } from 'react-icons/fa';

export default function CartSidebar() {
  const { isCartOpen, toggleCart, cart, removeFromCart } = useCart();

  if (!isCartOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleCart}></div>
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-base-100 h-full shadow-2xl p-6 flex flex-col animate-slide-in-right">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold">Your Cart ({cart.length})</h2>
          <button onClick={toggleCart} className="btn btn-circle btn-ghost"><FaTimes /></button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-10 opacity-50">Cart is empty</div>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex gap-4 items-center bg-base-200 p-3 rounded-lg">
                <img src={item.imageUrl} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm opacity-70">${item.price} x {item.qty}</p>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="btn btn-ghost text-error btn-sm"><FaTrash /></button>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary w-full">Checkout</button>
        </div>
      </div>
    </div>
  );
}