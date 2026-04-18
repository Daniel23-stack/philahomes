import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { Briefcase } from 'lucide-react';

function JobStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    scheduled: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-amber-100 text-amber-800',
    completed: 'bg-emerald-100 text-emerald-800',
  };
  const style = styles[status] ?? 'bg-slate-100 text-slate-700';
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

export default async function AdminJobsPage() {
  let jobs: {
    id: string;
    status: string;
    scheduledDate: Date | null;
    completedAt: Date | null;
    request: { id: string; serviceCategory: string; contactName: string };
    quote: { amount: number | null; status: string };
  }[] = [];

  try {
    jobs = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        request: { select: { id: true, serviceCategory: true, contactName: true } },
        quote: { select: { amount: true, status: true } },
      },
    });
  } catch {
    // DB not ready
  }

  return (
    <div>
      <AdminPageHeader title="Jobs" description="Jobs created from accepted quotes." />

      {jobs.length === 0 ? (
        <AdminEmptyState
          icon={Briefcase}
          title="No jobs yet"
          description="Jobs appear when a quote is accepted and scheduled."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Quote
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Scheduled
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {jobs.map((j) => (
                <tr key={j.id} className="transition hover:bg-slate-50/50">
                  <td className="whitespace-nowrap px-6 py-4 font-medium capitalize text-slate-900">
                    {j.request.serviceCategory}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{j.request.contactName}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                    {j.quote.amount != null ? `R ${j.quote.amount.toLocaleString('en-ZA')}` : '—'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <JobStatusBadge status={j.status} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    {j.scheduledDate
                      ? new Date(j.scheduledDate).toLocaleDateString(undefined, {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <Link
                      href={`/admin/requests/${j.request.id}`}
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
