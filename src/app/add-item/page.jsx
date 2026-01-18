'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaTag, FaDollarSign, FaImage, FaAlignLeft, FaSave, FaBoxOpen, FaStar, FaList } from 'react-icons/fa';

export default function AddItem() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const [form, setForm] = useState({
    name: '', price: '', description: '', imageUrl: '',
    category: 'Gaming', brand: '', stock: '10', features: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await fetch('/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          router.push('/items');
          router.refresh();
        } else {
            alert('Failed to save');
        }
    } catch (err) { alert('Error'); } 
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-6xl grid lg:grid-cols-5 gap-8 items-start">
        
        {/* --- FORM SECTION --- */}
        <div className="lg:col-span-3 card bg-base-100 shadow-xl border border-base-content/5">
          <div className="card-body">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <FaBoxOpen className="text-primary"/> Add Product
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label font-bold">Product Name</label>
                  <input name="name" type="text" placeholder="e.g. RTX 4090" className="input input-bordered" required onChange={handleChange} />
                </div>
                <div className="form-control">
                  <label className="label font-bold">Price ($)</label>
                  <input name="price" type="number" step="0.01" placeholder="99.99" className="input input-bordered" required onChange={handleChange} />
                </div>
              </div>

              {/* Row 2: Category & Brand */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label font-bold">Category</label>
                    <select name="category" className="select select-bordered" onChange={handleChange} value={form.category}>
                        <option>Gaming</option>
                        <option>Workstation</option>
                        <option>Peripherals</option>
                        <option>Accessories</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label font-bold">Brand</label>
                    <input name="brand" type="text" placeholder="e.g. Asus" className="input input-bordered" onChange={handleChange} />
                </div>
              </div>

               {/* Row 3: Stock & Image */}
               <div className="grid md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label font-bold">Stock Quantity</label>
                    <input name="stock" type="number" placeholder="10" className="input input-bordered" onChange={handleChange} />
                </div>
                <div className="form-control">
                    <label className="label font-bold">Image URL</label>
                    <input name="imageUrl" type="text" placeholder="https://..." className="input input-bordered" onChange={handleChange} />
                </div>
              </div>

              <div className="form-control">
                 <label className="label font-bold">Features (One per line)</label>
                 <textarea name="features" className="textarea textarea-bordered h-24" placeholder="- RGB Lighting&#10;- Mechanical Switches" onChange={handleChange}></textarea>
              </div>

              <div className="form-control">
                 <label className="label font-bold">Description</label>
                 <textarea name="description" className="textarea textarea-bordered h-24" placeholder="Detailed info..." required onChange={handleChange}></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? 'Saving...' : 'Publish Product'}
              </button>
            </form>
          </div>
        </div>

        {/* --- PREVIEW SECTION --- */}
        <div className="lg:col-span-2 space-y-4 sticky top-24">
            <h3 className="font-bold opacity-50 uppercase tracking-widest text-sm">Live Preview</h3>
            <div className="card bg-base-100 shadow-xl overflow-hidden group">
                <figure className="h-64 bg-base-200 relative overflow-hidden">
                    <img src={form.imageUrl || "https://placehold.co/400"} className="object-cover w-full h-full" />
                    <div className="absolute top-4 right-4 badge badge-primary">{form.category}</div>
                </figure>
                <div className="card-body">
                    <h2 className="card-title justify-between">
                        {form.name || 'Product Name'}
                        <div className="badge badge-outline">{form.brand || 'Brand'}</div>
                    </h2>
                    <div className="flex items-center gap-2 text-warning text-sm my-1">
                        <FaStar /> 4.5 <span className="text-base-content/30">• In Stock: {form.stock || 0}</span>
                    </div>
                    <p className="opacity-70 text-sm line-clamp-3">{form.description || 'Description...'}</p>
                    <div className="card-actions justify-end mt-4">
                        <div className="text-xl font-bold mr-auto">${form.price || '0.00'}</div>
                        <button className="btn btn-primary btn-sm">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}