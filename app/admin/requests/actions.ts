'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const ALLOWED_STATUSES = ['pending', 'quoted', 'accepted', 'in_progress', 'completed'] as const;

export async function updateServiceRequestStatus(id: string, status: string) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== 'admin') {
    return { ok: false as const, error: 'Unauthorized' };
  }
  if (!ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])) {
    return { ok: false as const, error: 'Invalid status' };
  }
  try {
    await prisma.serviceRequest.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/requests');
    revalidatePath(`/admin/requests/${id}`);
    return { ok: true as const };
  } catch {
    return { ok: false as const, error: 'Update failed' };
  }
}
