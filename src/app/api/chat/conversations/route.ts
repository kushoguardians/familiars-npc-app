import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Chat } from '@/models/Chat';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    if (!from || !to) {
      return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
    }

    await connectToDatabase();

    const conversations = await Chat.find({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    }).sort({ timestamp: 1 });

    return NextResponse.json({ success: true, conversations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
