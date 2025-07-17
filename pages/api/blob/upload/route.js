import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }
    
    // Next.js App Router style upload
    const blob = await put(filename, request.body, {
      access: 'public',
    });
    
    return NextResponse.json(blob);
  } catch (error) {
    console.error('Blob upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload to Vercel Blob' },
      { status: 500 }
    );
  }
}
