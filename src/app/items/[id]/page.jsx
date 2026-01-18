import Link from 'next/link';
import { FaArrowLeft, FaShoppingCart, FaStar, FaCheck, FaTruck, FaShieldAlt } from 'react-icons/fa';
import AddToCartButton from '@/components/AddToCartButton';

// 1. Fetch Logic
async function getItem(id) {
  try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/items/${id}`, { cache: 'no-store' });
      if (!res.ok) return null;
      return res.json();
  } catch (e) { return null; }
}

export default async function ItemDetail({ params }) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <Link href="/items" className="btn btn-primary">Back to Catalog</Link>
        </div>
    </div>
  );

  const displayName = item.name || item.productName || 'Untitled Product';
  const displayImage = item.imageUrl || item.image || "https://placehold.co/600";
  const displayStock = item.stock || item.stockQuantity || 0;
  const displayRating = item.rating || 4.5;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="text-sm breadcrumbs container mx-auto max-w-6xl mb-6">
        <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/items">Catalog</Link></li>
            <li>{item.category || 'Product'}</li>
            <li className="font-bold">{displayName}</li>
        </ul>
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 bg-base-100 rounded-3xl shadow-xl p-8 lg:p-12">
            
            <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 border border-base-content/10 flex items-center justify-center h-[400px] lg:h-[500px]">
                    <img 
                        src={displayImage} // UPDATED
                        alt={displayName} 
                        className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <div className="flex gap-4 justify-center">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-20 h-20 bg-white rounded-lg border hover:border-primary cursor-pointer p-2">
                             <img src={displayImage} className="w-full h-full object-contain opacity-50 hover:opacity-100"/>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col h-full">
                <div className="badge badge-primary mb-4">{item.brand || 'TechGear'}</div>
                <h1 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">{displayName}</h1>
                
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex text-yellow-500 gap-1 text-lg">
                        {[...Array(5)].map((_, i) => (
                             <FaStar key={i} className={i < Math.floor(displayRating) ? "" : "text-gray-300"} />
                        ))}
                    </div>
                    <span className="text-sm opacity-60">(120 Reviews)</span>
                    <span className="w-px h-6 bg-base-content/20"></span>
                    <span className={`font-bold ${displayStock > 0 ? 'text-success' : 'text-error'}`}>
                        {displayStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>

                <div className="text-4xl font-bold text-primary mb-8 border-b pb-8 border-base-content/10">
                    ${item.price}
                </div>

                <div className="prose max-w-none mb-8">
                    <h3 className="text-lg font-bold mb-2">About this item</h3>
                    <p className="opacity-80">{item.description}</p>
                    
                    {item.features && item.features.length > 0 && (
                        <ul className="mt-4 space-y-2">
                            {item.features.map((feat, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <FaCheck className="text-primary mt-1 flex-shrink-0" /> 
                                    <span>{feat}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mt-auto space-y-4">
                    <AddToCartButton item={{...item, name: displayName, imageUrl: displayImage}} />
                    
                    <div className="grid grid-cols-2 gap-4 text-xs opacity-70 mt-6">
                        <div className="flex items-center gap-2"><FaTruck /> Free Shipping</div>
                        <div className="flex items-center gap-2"><FaShieldAlt /> 2 Year Warranty</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}