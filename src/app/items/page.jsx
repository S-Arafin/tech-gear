'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { FaSearch, FaFilter, FaLayerGroup } from 'react-icons/fa';

export default function ItemsPage() {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  // 1. Fetch Data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/items');
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setAllItems(data);
          setFilteredItems(data);
          
          // Extract unique categories dynamically
          const uniqueCats = ['All', ...new Set(data.map(item => item.category || 'Uncategorized'))];
          setCategories(uniqueCats);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 2. Handle Filtering (Search + Category)
  useEffect(() => {
    let result = allItems;

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(item => (item.category || 'Uncategorized') === selectedCategory);
    }

    // Filter by Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        (item.description && item.description.toLowerCase().includes(lowerQuery))
      );
    }

    setFilteredItems(result);
  }, [searchQuery, selectedCategory, allItems]);

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-10 space-y-4">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-black text-primary"
            >
                Catalog
            </motion.h1>
            <p className="text-base-content/60 max-w-2xl mx-auto">
                Explore our premium collection of high-performance gear. Use the filters below to find exactly what you need.
            </p>
        </div>

        {/* --- CONTROLS SECTION --- */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-4 mb-10 border border-base-content/5 sticky top-20 z-30">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        className="input input-bordered w-full pl-10 focus:input-primary rounded-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`btn btn-sm rounded-full whitespace-nowrap transition-all ${
                                selectedCategory === cat 
                                ? 'btn-primary shadow-lg shadow-primary/30' 
                                : 'btn-ghost hover:bg-base-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        {loading ? (
            // Loading Skeletons
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="card bg-base-100 h-96 animate-pulse">
                        <div className="h-1/2 bg-base-300 rounded-t-2xl"></div>
                        <div className="card-body">
                            <div className="h-4 bg-base-300 w-3/4 mb-2"></div>
                            <div className="h-4 bg-base-300 w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={item._id}
                            >
                                <ProductCard item={item} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-base-content/50">
                            <FaLayerGroup className="text-6xl mx-auto mb-4 opacity-20" />
                            <h3 className="text-2xl font-bold">No items found</h3>
                            <p>Try adjusting your search or filter.</p>
                            <button 
                                onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                                className="btn btn-link"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        )}
      </div>
    </div>
  );
}