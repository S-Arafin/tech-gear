'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaShieldAlt,
  FaCreditCard,
  FaShoppingCart,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const handleRemove = (item) => {
    removeFromCart(item._id);
    toast.error(`${item.name} removed`, {
      icon: <FaTrash />,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      toast.success("Cart cleared", {
        icon: <FaCheckCircle className="text-green-500" />,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const handleCheckout = () => {
    toast.success("Processing Checkout...", {
      icon: <FaCreditCard className="text-blue-500" />,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
        <Toaster position="top-center" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-base-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <span className="text-4xl">🛒</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-base-content/60 mb-8">
            Looks like you haven't added any tech gear yet.
          </p>
          <Link href="/items" className="btn btn-primary btn-wide">
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <Toaster position="top-center" />
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          Shopping Cart{" "}
          <span className="text-base-content/40 text-lg font-normal">
            ({cart.length} items)
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={item._id}
                className="card bg-base-100 shadow-sm border border-base-content/5"
              >
                <div className="card-body flex-row gap-4 items-center p-4 sm:p-6">
                  <figure className="w-24 h-24 bg-white rounded-xl border p-2 flex-shrink-0">
                    <img
                      src={
                        item.imageUrl ||
                        item.image ||
                        "https://placehold.co/400"
                      }
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </figure>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          ${(item.price * item.qty).toFixed(2)}
                        </div>
                        <div className="text-xs text-base-content/50">
                          ${item.price} each
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 bg-base-200 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item._id, -1)}
                          className="btn btn-sm btn-ghost btn-square"
                          disabled={item.qty <= 1}
                        >
                          <FaMinus size={10} />
                        </button>
                        <span className="font-bold w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, 1)}
                          className="btn btn-sm btn-ghost btn-square"
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item)}
                        className="btn btn-ghost btn-sm text-error gap-2"
                      >
                        <FaTrash />{" "}
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <Link href="/items" className="btn btn-ghost gap-2">
                <FaArrowLeft /> Continue Shopping
              </Link>
              <button
                onClick={handleClear}
                className="btn btn-outline btn-error btn-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl border border-base-content/5 sticky top-24">
              <div className="card-body">
                <h2 className="card-title mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="opacity-70">Subtotal</span>
                    <span className="font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Shipping</span>
                    <span className="text-success">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Tax (Estimate)</span>
                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between text-xl font-black">
                    <span>Total</span>
                    <span className="text-primary">
                      ${(cartTotal * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn btn-primary btn-block shadow-lg shadow-primary/20"
                >
                  Checkout <FaCreditCard />
                </button>

                <div className="mt-4 text-xs opacity-50 text-center flex justify-center items-center gap-2">
                  <FaShieldAlt /> Secure SSL Encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}