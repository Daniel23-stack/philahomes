import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { FileText } from 'lucide-react';

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800',
    quoted: 'bg-blue-100 text-blue-800',
    accepted: 'bg-emerald-100 text-emerald-800',
    in_progress: 'bg-sky-100 text-sky-800',
    completed: 'bg-slate-100 text-slate-700',
  };
  const style = styles[status] ?? 'bg-slate-100 text-slate-700';
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

export default async function AdminRequestsPage() {
  let requests: { id: string; serviceCategory: string; contactName: string; contactEmail: string; status: string; createdAt: Date }[] = [];
  try {
    requests = await prisma.serviceRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: { id: true, serviceCategory: true, contactName: true, contactEmail: true, status: true, createdAt: true },
    });
  } catch {
    // DB not ready
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Service requests</h1>
        <p className="mt-1 text-slate-500">Review and manage quote requests from customers.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <FileText className="h-7 w-7" />
            </div>
            <p className="mt-4 font-medium text-slate-900">No requests yet</p>
            <p className="mt-1 text-sm text-slate-500">New service requests will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="bg-slate-50/80">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Contact
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
                {requests.map((r) => (
                  <tr key={r.id} className="transition hover:bg-slate-50/50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="font-medium capitalize text-slate-900">{r.serviceCategory}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{r.contactName}</p>
                        <p className="text-sm text-slate-500">{r.contactEmail}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {new Date(r.createdAt).toLocaleDateString(undefined, {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <Link
                        href={`/admin/requests/${r.id}`}
                        className="text-sm font-medium text-orange-600 hover:text-orange-500"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
