
import Link from 'next/link';

async function getItem(id) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/items/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function ItemDetail({ params }) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) return <div className="p-10">Item not found</div>;

  return (
    <div data-theme="tech-gear" className="min-h-screen bg-base-200">
      
      <div className="hero min-h-[60vh] bg-base-100 mt-10 w-11/12 mx-auto rounded-box shadow-xl">
        <div className="hero-content flex-col lg:flex-row gap-10">
          <img src={item.imageUrl || "https://placehold.co/400"} className="max-w-sm rounded-lg shadow-2xl bg-white" />
          <div>
            <h1 className="text-5xl font-bold text-primary">{item.name}</h1>
            <p className="py-6 text-xl opacity-80">{item.description}</p>
            <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-secondary">${item.price}</span>
                <button className="btn btn-primary btn-wide">Add to Cart</button>
            </div>
            <Link href="/items" className="btn btn-ghost mt-6">← Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}