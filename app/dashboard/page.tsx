import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return null;

  let requests: { id: string; serviceCategory: string; status: string; createdAt: Date }[] = [];
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      requests = await prisma.serviceRequest.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { id: true, serviceCategory: true, status: true, createdAt: true },
      });
    }
  } catch {
    // DB not ready
  }

  return (
    <div>
      <h1 className="section-heading">Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome back. Here’s an overview of your activity.</p>
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-[var(--color-primary)]">Recent requests</h2>
        {requests.length === 0 ? (
          <p className="mt-4 text-gray-500">No requests yet.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {requests.map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
                <span className="font-medium capitalize">{r.serviceCategory}</span>
                <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700">{r.status}</span>
              </li>
            ))}
          </ul>
        )}
        <Link href="/request-quote" className="btn-primary mt-4 inline-block">
          Request a quote
        </Link>
      </section>
    </div>
  );
}
