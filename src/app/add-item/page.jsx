'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaTag, FaDollarSign, FaImage, FaAlignLeft, FaSave } from 'react-icons/fa';

export default function AddItem() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState({
    name: 'Product Name',
    price: '0.00',
    description: 'Product description will appear here...',
    imageUrl: ''
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreview(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // ... same submit logic as before ...
    try {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const res = await fetch('/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          router.push('/items');
          router.refresh();
        } else {
            alert('Failed');
        }
    } catch (err) { alert('Error'); } 
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 relative overflow-hidden">
      {/* Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary/10 blur-[100px] -z-10 rounded-full"></div>

      <div className="container mx-auto max-w-6xl grid lg:grid-cols-5 gap-8 items-start">
        
        {/* --- LEFT: FORM --- */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 card bg-base-100 shadow-2xl border border-base-content/5"
        >
          <div className="card-body p-8">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Add New Product
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label font-bold">Product Name</label>
                  <div className="relative">
                    <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input 
                        name="name" 
                        type="text" 
                        placeholder="e.g. Gaming Mouse" 
                        className="input input-bordered w-full pl-10 focus:input-primary" 
                        required 
                        onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label font-bold">Price</label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input 
                        name="price" 
                        type="number" 
                        step="0.01" 
                        placeholder="99.99" 
                        className="input input-bordered w-full pl-10 focus:input-primary" 
                        required 
                        onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-control">
                 <label className="label font-bold">Image URL</label>
                 <div className="relative">
                    <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input 
                        name="imageUrl" 
                        type="text" 
                        placeholder="https://..." 
                        className="input input-bordered w-full pl-10 focus:input-primary" 
                        onChange={handleChange}
                    />
                 </div>
              </div>

              <div className="form-control">
                 <label className="label font-bold">Description</label>
                 <div className="relative">
                    <FaAlignLeft className="absolute left-4 top-4 text-base-content/40" />
                    <textarea 
                        name="description" 
                        className="textarea textarea-bordered h-40 w-full pl-10 focus:textarea-primary leading-relaxed" 
                        placeholder="Describe the product features..." 
                        required
                        onChange={handleChange}
                    ></textarea>
                 </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="btn btn-primary btn-wide shadow-lg shadow-primary/30" disabled={loading}>
                  {loading ? <span className="loading loading-dots"></span> : <><FaSave /> Publish Product</>}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* --- RIGHT: LIVE PREVIEW --- */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
        >
            <div className="text-sm font-bold uppercase tracking-widest opacity-50 mb-2">Live Preview</div>
            
            {/* Preview Card */}
            <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-content/5 sticky top-24">
                <figure className="h-64 bg-base-200 relative flex items-center justify-center overflow-hidden">
                    {preview.imageUrl ? (
                        <img src={preview.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-base-content/20 flex flex-col items-center">
                            <FaImage className="text-6xl mb-2" />
                            <span>No Image</span>
                        </div>
                    )}
                    <div className="absolute top-4 right-4 badge badge-secondary">New</div>
                </figure>
                <div className="card-body">
                    <div className="flex justify-between items-start">
                        <h2 className="card-title text-xl font-bold">{preview.name || 'Product Name'}</h2>
                        <span className="text-2xl font-black text-primary">${preview.price || '0.00'}</span>
                    </div>
                    <p className="text-sm opacity-70 line-clamp-3 mt-2 min-h-[3rem]">
                        {preview.description || 'Description will appear here...'}
                    </p>
                    <div className="card-actions justify-end mt-6">
                        <button className="btn btn-primary btn-sm btn-disabled opacity-50">Add to Cart</button>
                    </div>
                </div>
            </div>
            
            <div className="alert alert-info shadow-lg text-sm">
                <span>ℹ️ This is how your product will appear in the catalog.</span>
            </div>
        </motion.div>

      </div>
    </div>
  );
}