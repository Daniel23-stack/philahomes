import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

type Props = { params: Promise<{ id: string }> };

export default async function JobDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');
  const { id } = await params;

  let job: { id: string; status: string; scheduledDate: Date | null; notes: string | null; request: { serviceCategory: string; userId: string | null } } | null = null;
  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (user) {
      const j = await prisma.job.findUnique({
        where: { id },
        select: { id: true, status: true, scheduledDate: true, notes: true, request: { select: { serviceCategory: true, userId: true } } },
      });
      if (j && j.request.userId === user.id) job = j;
    }
  } catch {
    // DB not ready
  }
  if (!job) notFound();

  return (
    <div>
      <h1 className="section-heading">Job</h1>
      <p className="mt-2 text-gray-600">Service: {job.request.serviceCategory}</p>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <p><strong>Status:</strong> {job.status}</p>
        {job.scheduledDate && <p><strong>Scheduled:</strong> {new Date(job.scheduledDate).toLocaleDateString()}</p>}
        {job.notes && <p className="mt-2">{job.notes}</p>}
      </div>
    </div>
  );
}
