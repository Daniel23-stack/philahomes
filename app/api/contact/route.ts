import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, query } = body;
    if (!name || !contact || !query) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    // In production: send email (e.g. Resend) or store in DB
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
