import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { MessageSquare } from 'lucide-react';

function QuoteStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: 'bg-slate-100 text-slate-700',
    sent: 'bg-blue-100 text-blue-800',
    accepted: 'bg-emerald-100 text-emerald-800',
    declined: 'bg-red-100 text-red-800',
  };
  const style = styles[status] ?? 'bg-slate-100 text-slate-700';
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}>{status}</span>
  );
}

export default async function AdminQuotesPage() {
  let quotes: {
    id: string;
    amount: number | null;
    status: string;
    notes: string | null;
    createdAt: Date;
    request: { id: string; serviceCategory: string; contactName: string };
  }[] = [];

  try {
    quotes = await prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        request: { select: { id: true, serviceCategory: true, contactName: true } },
      },
    });
  } catch {
    // DB not ready
  }

  return (
    <div>
      <AdminPageHeader title="Quotes" description="Quotes linked to service requests." />

      {quotes.length === 0 ? (
        <AdminEmptyState
          icon={MessageSquare}
          title="No quotes yet"
          description="Create quotes from the CRM or link them to service requests."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Request
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {quotes.map((q) => (
                <tr key={q.id} className="transition hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <p className="font-medium capitalize text-slate-900">{q.request.serviceCategory}</p>
                    <p className="text-sm text-slate-500">{q.request.contactName}</p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-slate-900">
                    {q.amount != null ? `R ${q.amount.toLocaleString('en-ZA')}` : '—'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <QuoteStatusBadge status={q.status} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    {new Date(q.createdAt).toLocaleDateString(undefined, {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <Link
                      href={`/admin/requests/${q.request.id}`}
                      className="text-sm font-medium text-orange-600 hover:text-orange-500"
                    >
                      View request
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
