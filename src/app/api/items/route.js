import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

// 1. GET Method (Fixes the 405 Error)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('tech-gear');
    
    // Fetch items, sort by newest first (-1)
    const items = await db.collection('items')
      .find({})
      .sort({ _id: -1 }) 
      .toArray();

    return NextResponse.json(items);
  } catch (e) {
    console.error("Database Error:", e);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

// 2. POST Method (For adding items)
export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('tech-gear');
    
    // Simple Validation
    if (!body.name || !body.price) {
      return NextResponse.json({ error: 'Name and Price required' }, { status: 400 });
    }

    // Force types
    const newItem = {
      name: body.name,
      description: body.description || '',
      price: parseFloat(body.price),
      imageUrl: body.imageUrl || "https://placehold.co/400",
      createdAt: new Date(),
    };

    const result = await db.collection('items').insertOne(newItem);
    
    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}