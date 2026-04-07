import { prisma } from '@/lib/prisma';
import { Users } from 'lucide-react';

function RoleBadge({ role }: { role: string }) {
  const isAdmin = role === 'admin';
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
        isAdmin ? 'bg-violet-100 text-violet-800' : 'bg-slate-100 text-slate-700'
      }`}
    >
      {role}
    </span>
  );
}

export default async function AdminUsersPage() {
  let users: { id: string; email: string; name: string | null; role: string; createdAt: Date }[] = [];
  try {
    users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
  } catch {
    // DB not ready
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Users</h1>
        <p className="mt-1 text-slate-500">Registered clients and admin accounts.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Users className="h-7 w-7" />
            </div>
            <p className="mt-4 font-medium text-slate-900">No users yet</p>
            <p className="mt-1 text-sm text-slate-500">Users appear here after registration.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="bg-slate-50/80">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {users.map((u) => (
                  <tr key={u.id} className="transition hover:bg-slate-50/50">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                      {u.name || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{u.email}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <RoleBadge role={u.role} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {new Date(u.createdAt).toLocaleDateString(undefined, {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
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
