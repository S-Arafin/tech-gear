import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db('tech-gear');
    
    const item = await db.collection('items').findOne({ _id: new ObjectId(id) });
    
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
}