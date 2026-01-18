"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import {
  FaSearch,
  FaLayerGroup,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Gaming",
    "Workstation",
    "Peripherals",
    "Accessories",
  ];

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: 12,
          category: selectedCategory,
          search: searchQuery,
        });

        const res = await fetch(`/api/items?${params.toString()}`);
        const data = await res.json();

        if (data.items) {
          setItems(data.items);
          setTotalPages(data.pagination.totalPages);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    }

    const timeoutId = setTimeout(() => {
      fetchItems();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currentPage, searchQuery, selectedCategory]);

  const handleFilterChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-primary"
          >
            Catalog
          </motion.h1>
          <p className="text-base-content/60 max-w-2xl mx-auto">
            Explore our premium collection.
          </p>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-xl p-4 mb-10 border border-base-content/5 sticky top-20 z-30">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
              <input
                type="text"
                placeholder="Search products..."
                className="input input-bordered w-full pl-10 focus:input-primary rounded-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilterChange(cat)}
                  className={`btn btn-sm rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "btn-primary shadow-lg shadow-primary/30"
                      : "btn-ghost hover:bg-base-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {items.length > 0 ? (
                  items.map((item) => (
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
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        handleFilterChange("All");
                      }}
                      className="btn btn-link"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="join shadow-lg border border-base-content/10 bg-base-100">
                  <button
                    className="join-item btn"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <FaChevronLeft />
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`join-item btn ${currentPage === index + 1 ? "btn-primary" : ""}`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className="join-item btn"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
