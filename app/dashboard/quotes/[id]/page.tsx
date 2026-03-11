import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

type Props = { params: Promise<{ id: string }> };

export default async function QuoteDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');
  const { id } = await params;

  let quote: { id: string; amount: number | null; status: string; notes: string | null; request: { serviceCategory: string; userId: string | null } } | null = null;
  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (user) {
      const q = await prisma.quote.findUnique({
        where: { id },
        select: { id: true, amount: true, status: true, notes: true, request: { select: { serviceCategory: true, userId: true } } },
      });
      if (q && q.request.userId === user.id) quote = q;
    }
  } catch {
    // DB not ready
  }
  if (!quote) notFound();

  return (
    <div>
      <h1 className="section-heading">Quote</h1>
      <p className="mt-2 text-gray-600">Service: {quote.request.serviceCategory}</p>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <p><strong>Status:</strong> {quote.status}</p>
        {quote.amount != null && <p><strong>Amount:</strong> R{quote.amount.toLocaleString()}</p>}
        {quote.notes && <p className="mt-2">{quote.notes}</p>}
      </div>
    </div>
  );
}
