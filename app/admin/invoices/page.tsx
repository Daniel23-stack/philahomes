import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Receipt, TrendingUp, Banknote, AlertCircle, ArrowRight, FileText } from 'lucide-react';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(amount);
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: 'bg-slate-100 text-slate-700',
    sent: 'bg-blue-100 text-blue-800',
    paid: 'bg-emerald-100 text-emerald-800',
    overdue: 'bg-red-100 text-red-800',
  };
  const style = styles[status] ?? 'bg-slate-100 text-slate-700';
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}>
      {status}
    </span>
  );
}

export default async function AdminInvoicesPage() {
  let invoices: {
    id: string;
    amount: number;
    status: string;
    dueDate: Date | null;
    paidAt: Date | null;
    createdAt: Date;
    user: { name: string | null; email: string };
  }[] = [];
  let stats = { total: 0, paid: 0, sent: 0, overdue: 0, draft: 0, totalRevenue: 0, monthRevenue: 0 };

  try {
    invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: { user: { select: { name: true, email: true } } },
    });
    const all = await prisma.invoice.findMany({ select: { status: true, amount: true, paidAt: true } });
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    stats.total = all.length;
    stats.paid = all.filter((i) => i.status === 'paid').length;
    stats.sent = all.filter((i) => i.status === 'sent').length;
    stats.overdue = all.filter((i) => i.status === 'overdue').length;
    stats.draft = all.filter((i) => i.status === 'draft').length;
    stats.totalRevenue = all.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
    stats.monthRevenue = all
      .filter((i) => i.status === 'paid' && i.paidAt && i.paidAt >= startOfMonth)
      .reduce((s, i) => s + i.amount, 0);
  } catch {
    // DB not ready
  }

  const pendingCount = stats.sent + stats.draft;

  return (
    <div className="space-y-6">
      {/* Top hero card - Congratulations style */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Invoices overview</h1>
            <p className="mt-1 text-slate-500">Track revenue and outstanding invoices.</p>
            <p className="mt-3 text-3xl font-bold text-blue-600">{formatCurrency(stats.totalRevenue)}</p>
            <p className="mt-0.5 text-sm text-slate-600">Total paid to date</p>
            <Link
              href="#latest"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              View invoices
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <Receipt className="h-12 w-12" />
          </div>
        </div>
      </div>

      {/* Stat cards row - Purchase / Order style */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <Banknote className="h-6 w-6" />
          </span>
          <p className="mt-3 text-2xl font-bold text-slate-900">{stats.paid}</p>
          <p className="text-sm font-medium text-slate-600">Paid</p>
          <p className="text-xs text-slate-500">{formatCurrency(stats.totalRevenue)} total</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <FileText className="h-6 w-6" />
          </span>
          <p className="mt-3 text-2xl font-bold text-slate-900">{pendingCount}</p>
          <p className="text-sm font-medium text-slate-600">Pending</p>
          <p className="text-xs text-slate-500">Draft & sent</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
            <TrendingUp className="h-6 w-6" />
          </span>
          <p className="mt-3 text-2xl font-bold text-slate-900">{formatCurrency(stats.monthRevenue)}</p>
          <p className="text-sm font-medium text-slate-600">This month</p>
          <p className="text-xs text-slate-500">Paid in current month</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <AlertCircle className="h-6 w-6" />
          </span>
          <p className="mt-3 text-2xl font-bold text-slate-900">{stats.overdue}</p>
          <p className="text-sm font-medium text-slate-600">Overdue</p>
          <p className="text-xs text-slate-500">Requires follow-up</p>
        </div>
      </div>

      {/* Sales overview style card + Latest invoices */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="text-lg font-semibold text-slate-900">Summary</h2>
          <p className="mt-1 text-sm text-slate-500">Last 30 days</p>
          <div className="mt-6 space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Paid</span>
                <span className="font-medium text-slate-900">{formatCurrency(stats.monthRevenue)}</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: stats.totalRevenue ? `${Math.min(100, (stats.monthRevenue / stats.totalRevenue) * 100)}%` : '0%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Total invoices</span>
                <span className="font-medium text-slate-900">{stats.total}</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: stats.total ? `${(stats.paid / stats.total) * 100}%` : '0%' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div id="latest" className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Latest invoices</h2>
            <p className="text-sm text-slate-500">Recent activity</p>
          </div>
          {invoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Receipt className="h-7 w-7" />
              </span>
              <p className="mt-4 font-medium text-slate-900">No invoices yet</p>
              <p className="mt-1 text-sm text-slate-500">Invoices can be created from completed quotes or jobs.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead>
                  <tr className="bg-slate-50/80">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Due</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="transition hover:bg-slate-50/50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="font-medium text-slate-900">{inv.user.name || inv.user.email}</p>
                        <p className="text-sm text-slate-500">{inv.user.email}</p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">{formatCurrency(inv.amount)}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge status={inv.status} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                        {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <Link href={`/admin/invoices/${inv.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-500">
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
    </div>
  );
}
