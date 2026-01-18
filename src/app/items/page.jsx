
import Link from 'next/link';

async function getItems() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/items`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <div data-theme="tech-gear" className="min-h-screen bg-base-200">
      
      <div className="container mx-auto p-10">
        <h1 className="text-4xl font-bold mb-8 text-primary">Catalog</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <figure className="h-48 bg-white p-4">
                <img src={item.imageUrl || "https://placehold.co/400"} alt={item.name} className="h-full object-contain" />
              </figure>
              <div className="card-body">
                <h2 className="card-title justify-between">
                  {item.name}
                  <div className="badge badge-secondary">${item.price}</div>
                </h2>
                <p className="line-clamp-2 text-sm opacity-70">{item.description}</p>
                <div className="card-actions justify-end mt-4">
                  <Link href={`/items/${item._id}`} className="btn btn-primary btn-sm">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}