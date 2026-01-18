import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12'); // Default 12
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'All';

    const client = await clientPromise;
    const db = client.db('tech-gear');
    
    // 1. Build the Query Object
    const query = {};

    // Filter by Category
    if (category !== 'All') {
      query.category = category;
    }

    // Filter by Search (Regex for partial match)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { productName: { $regex: search, $options: 'i' } }, // Handle legacy data
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // 2. Calculate Skip
    const skip = (page - 1) * limit;

    // 3. Fetch Data & Count Total (Parallel for speed)
    const [items, totalItems] = await Promise.all([
      db.collection('items')
        .find(query)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection('items').countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    // 4. Return Structured Response
    return NextResponse.json({
      items,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit
      }
    });

  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request) {
  // ... (Keep your existing POST logic exactly the same) ...
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('tech-gear');
    
    if (!body.name || !body.price) {
      return NextResponse.json({ error: 'Name and Price required' }, { status: 400 });
    }

    const newItem = {
      name: body.name,
      description: body.description || '',
      price: parseFloat(body.price),
      imageUrl: body.imageUrl || "https://placehold.co/400",
      category: body.category || 'Uncategorized',
      brand: body.brand || 'Generic',
      stock: parseInt(body.stock) || 0,
      rating: parseFloat(body.rating) || 4.5,
      features: body.features ? body.features.split('\n') : [],
      createdAt: new Date(),
    };

    const result = await db.collection('items').insertOne(newItem);
    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}