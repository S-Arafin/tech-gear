import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('tech-gear');
    const items = await db.collection('items').find({}).sort({ _id: -1 }).toArray();
    return NextResponse.json(items);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request) {
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
      // --- NEW FIELDS ---
      category: body.category || 'Uncategorized',
      brand: body.brand || 'Generic',
      stock: parseInt(body.stock) || 0,
      rating: parseFloat(body.rating) || 4.5, // Default mock rating
      features: body.features ? body.features.split('\n') : [], // Split text into array
      createdAt: new Date(),
    };

    const result = await db.collection('items').insertOne(newItem);
    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}