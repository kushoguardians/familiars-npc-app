import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Chat } from '@/models/Chat';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { from, to, message, type } = body;

    if (!from || !to || !message || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();

    const chat = new Chat({ from, to, message, type });
    await chat.save();

    return NextResponse.json({ success: true, chat }, { status: 201 });
  } catch (error) {
    console.error('Error saving chat:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
