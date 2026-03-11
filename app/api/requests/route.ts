import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      serviceCategory,
      subService,
      description,
      contactName,
      contactEmail,
      contactPhone,
      imageUrls,
    } = body;
    if (!serviceCategory || !description || !contactName || !contactEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const imageUrlsStr = imageUrls?.length ? JSON.stringify(imageUrls) : null;
    const req = await prisma.serviceRequest.create({
      data: {
        serviceCategory,
        subService: subService || null,
        description,
        contactName,
        contactEmail,
        contactPhone: contactPhone || null,
        imageUrls: imageUrlsStr,
        status: 'pending',
      },
    });
    return NextResponse.json({ id: req.id, ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
