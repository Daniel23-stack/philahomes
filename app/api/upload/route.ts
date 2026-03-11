import { NextResponse } from 'next/server';

// Placeholder: in production use Vercel Blob, S3, or similar.
// For now we return placeholder URLs so the form still works.
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    if (!files.length) {
      return NextResponse.json({ urls: [] });
    }
    // In production: upload to storage and return real URLs
    const urls = files.map((_, i) => `/uploads/placeholder-${Date.now()}-${i}.jpg`);
    return NextResponse.json({ urls });
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
