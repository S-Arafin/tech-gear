import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('tech-gear');
    const items = await db.collection('items').find({}).toArray();
    return NextResponse.json(items);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('tech-gear');
    
    if(!body.name || !body.price) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const result = await db.collection('items').insertOne({
        ...body,
        createdAt: new Date()
    });
    
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}