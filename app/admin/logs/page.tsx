import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { ScrollText } from 'lucide-react';

export default async function AdminLogsPage() {
  let logs: {
    id: string;
    action: string;
    entityType: string | null;
    entityId: string | null;
    metadata: string | null;
    createdAt: Date;
    user: { email: string; name: string | null } | null;
  }[] = [];

  try {
    logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { user: { select: { email: true, name: true } } },
    });
  } catch {
    // DB not ready
  }

  return (
    <div>
      <AdminPageHeader title="Activity logs" description="Recent admin and system actions." />

      {logs.length === 0 ? (
        <AdminEmptyState
          icon={ScrollText}
          title="No logs yet"
          description="Activity will appear here as users interact with the system."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  When
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Entity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50">
                  <td className="whitespace-nowrap px-6 py-3 text-sm text-slate-500">
                    {new Date(log.createdAt).toLocaleString(undefined, {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-700">
                    {log.user ? log.user.name || log.user.email : '—'}
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-slate-900">{log.action}</td>
                  <td className="px-6 py-3 text-sm text-slate-600">
                    {log.entityType || '—'}
                    {log.entityId ? <span className="text-slate-400"> · {log.entityId.slice(0, 8)}…</span> : null}
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
