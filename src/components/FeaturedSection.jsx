'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard'; 

export default function FeaturedSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch('/api/items');

        // 1. Check if the response is actually OK (Status 200-299)
        if (!res.ok) {
          throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }

        // 2. Check if there is content to parse
        const text = await res.text();
        if (!text) {
            setItems([]); // Handle empty response
            return;
        }

        // 3. Parse JSON safely
        const data = JSON.parse(text);
        
        // 4. Ensure data is an array before slicing
        if (Array.isArray(data)) {
            setItems(data.slice(0, 3));
        } else {
            console.error("API returned non-array:", data);
            setItems([]);
        }

      } catch (error) {
        console.error("Failed to load items:", error);
        setErrorMsg("Failed to load featured items.");
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <section className="py-24 px-4 bg-base-200 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute right-0 top-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute left-0 bottom-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-base-content"
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Drops</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            className="h-1.5 bg-primary mx-auto rounded-full"
          />
        </div>

        {loading ? (
          // --- LOADING SKELETONS ---
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card bg-base-100 shadow-xl h-[400px] animate-pulse">
                <div className="h-1/2 bg-base-300 rounded-t-2xl"></div>
                <div className="card-body space-y-4">
                  <div className="h-6 bg-base-300 rounded w-3/4"></div>
                  <div className="h-4 bg-base-300 rounded w-full"></div>
                  <div className="h-4 bg-base-300 rounded w-1/2"></div>
                  <div className="h-10 bg-base-300 rounded w-full mt-auto"></div>
                </div>
              </div>
            ))}
          </div>
        ) : errorMsg ? (
           // --- ERROR STATE ---
           <div className="alert alert-error max-w-md mx-auto">
             <span>{errorMsg} Check console for details.</span>
           </div>
        ) : (
          // --- ACTUAL CONTENT ---
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {items.length > 0 ? (
              items.map((item) => (
                <motion.div key={item._id} variants={itemVariants}>
                  <ProductCard item={item} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <div className="alert alert-info max-w-md mx-auto">
                  <span>No products found. Add items to see them here!</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}