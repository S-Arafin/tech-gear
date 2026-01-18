'use client'; 

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="text-5xl" />
        </div>
        
        <h2 className="text-3xl font-black mb-2">Something went wrong!</h2>
        <p className="text-base-content/60 mb-8">
            {error.message || "An unexpected error occurred. Please try again."}
        </p>
        
        <div className="flex gap-4 justify-center">
            <button
                onClick={() => reset()}
                className="btn btn-primary gap-2 shadow-lg shadow-primary/20"
            >
                <FaRedo /> Try Again
            </button>
            <Link href="/" className="btn btn-outline">Go Home</Link>
        </div>
      </motion.div>
    </div>
  );
}