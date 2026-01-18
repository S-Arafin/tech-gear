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
        const res = await fetch('/api/items?limit=4');
        
        if (!res.ok) throw new Error(`API Error: ${res.status}`);

        const data = await res.json();
        
        if (data.items && Array.isArray(data.items)) {
            setItems(data.items);
        } else if (Array.isArray(data)) {
            setItems(data.slice(0, 4));
        } else {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <section className="py-24 px-4 bg-base-200 relative overflow-hidden">
        
        <div className="container mx-auto relative z-10">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="card bg-base-100 shadow-xl h-[400px] animate-pulse">
                    <div className="h-1/2 bg-base-300 rounded-t-2xl"></div>
                    <div className="card-body space-y-4">
                      <div className="h-6 bg-base-300 rounded w-3/4"></div>
                      <div className="h-4 bg-base-300 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : errorMsg ? (
               <div className="alert alert-error max-w-md mx-auto"><span>{errorMsg}</span></div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {items.length > 0 ? (
                  items.map((item) => (
                    <motion.div key={item._id} variants={itemVariants}>
                      <ProductCard item={item} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
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