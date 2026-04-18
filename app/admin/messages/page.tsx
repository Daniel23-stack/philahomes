import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { Inbox } from 'lucide-react';

export default async function AdminMessagesPage() {
  let rows: {
    id: string;
    updatedAt: Date;
    user: { email: string; name: string | null };
    messages: { body: string; createdAt: Date }[];
  }[] = [];

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 50,
      include: {
        user: { select: { email: true, name: true } },
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });
    rows = conversations;
  } catch {
    // DB not ready
  }

  return (
    <div>
      <AdminPageHeader title="Messages" description="Customer conversations (latest activity first)." />

      {rows.length === 0 ? (
        <AdminEmptyState
          icon={Inbox}
          title="No conversations yet"
          description="When clients message through the app, threads will appear here."
        />
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <ul className="divide-y divide-slate-200">
            {rows.map((c) => {
              const preview = c.messages[0]?.body ?? '(No messages)';
              const short = preview.length > 120 ? `${preview.slice(0, 120)}…` : preview;
              return (
                <li key={c.id} className="px-6 py-4 transition hover:bg-slate-50/50">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{c.user.name || c.user.email}</p>
                      <p className="text-sm text-slate-500">{c.user.email}</p>
                      <p className="mt-2 text-sm text-slate-600">{short}</p>
                    </div>
                    <p className="shrink-0 text-xs text-slate-400">
                      {new Date(c.updatedAt).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
