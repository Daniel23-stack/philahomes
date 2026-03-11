import { prisma } from '@/lib/prisma';
import { Users, FileText, MessageSquare, Briefcase, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(amount);
}

export default async function AdminAnalyticsPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  let requestsByMonth: { month: string; count: number }[] = [];
  let requestsByCategory: { category: string; count: number }[] = [];
  let revenueByDay: { day: string; amount: number }[] = [];
  let stats = {
    totalRequests: 0,
    totalQuotes: 0,
    totalJobs: 0,
    totalUsers: 0,
    totalRevenue: 0,
    monthRevenue: 0,
    paidInvoices: 0,
    completedJobs: 0,
  };
  let activity = { totalSales: 0, income: 0, invoices: 0, tasks: 0 };
  let growthPct = 0;
  let userGrowthPct = 0;

  try {
    const [requests, quotes, jobs, users, invoices, serviceRequestsAll] = await Promise.all([
      prisma.serviceRequest.findMany({
        where: { createdAt: { gte: sixMonthsAgo } },
        select: { createdAt: true, serviceCategory: true },
      }),
      prisma.quote.count(),
      prisma.job.findMany({ select: { status: true } }),
      prisma.user.findMany({ select: { createdAt: true } }),
      prisma.invoice.findMany({ select: { amount: true, status: true, paidAt: true, createdAt: true } }),
      prisma.serviceRequest.count(),
    ]);

    stats.totalRequests = serviceRequestsAll;
    stats.totalQuotes = quotes;
    stats.totalJobs = jobs.length;
    stats.totalUsers = users.length;
    stats.completedJobs = jobs.filter((j) => j.status === 'completed').length;
    stats.paidInvoices = invoices.filter((i) => i.status === 'paid').length;
    stats.totalRevenue = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
    stats.monthRevenue = invoices
      .filter((i) => i.status === 'paid' && i.paidAt && i.paidAt >= startOfMonth)
      .reduce((s, i) => s + i.amount, 0);

    const lastMonthRevenue = invoices
      .filter((i) => i.status === 'paid' && i.paidAt && i.paidAt >= startOfLastMonth && i.paidAt < startOfMonth)
      .reduce((s, i) => s + i.amount, 0);
    growthPct = lastMonthRevenue ? Math.round(((stats.monthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100) : 0;

    const lastMonthUsers = users.filter((u) => u.createdAt < startOfMonth).length;
    userGrowthPct = lastMonthUsers ? Math.round(((users.length - lastMonthUsers) / lastMonthUsers) * 100) : 0;

    const monthCounts: Record<string, number> = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString('en-ZA', { month: 'short', year: '2-digit' });
      monthCounts[key] = 0;
    }
    requests.forEach((r) => {
      const key = new Date(r.createdAt).toLocaleDateString('en-ZA', { month: 'short', year: '2-digit' });
      if (monthCounts[key] !== undefined) monthCounts[key]++;
    });
    requestsByMonth = Object.entries(monthCounts).map(([month, count]) => ({ month, count }));

    const catCounts: Record<string, number> = {};
    requests.forEach((r) => {
      const c = r.serviceCategory || 'other';
      catCounts[c] = (catCounts[c] || 0) + 1;
    });
    const totalCat = Object.values(catCounts).reduce((a, b) => a + b, 0) || 1;
    requestsByCategory = Object.entries(catCounts).map(([category, count]) => ({
      category: category.replace(/-/g, ' '),
      count: Math.round((count / totalCat) * 100),
    }));

    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
      const amount = invoices
        .filter((i) => i.status === 'paid' && i.paidAt && i.paidAt >= dayStart && i.paidAt < dayEnd)
        .reduce((s, i) => s + i.amount, 0);
      revenueByDay.push({ day: dayLabels[d.getDay()], amount });
    }

    activity.totalSales = stats.monthRevenue;
    activity.income = stats.totalRevenue;
    activity.invoices = stats.paidInvoices;
    activity.tasks = stats.completedJobs;
  } catch {
    // DB not ready
  }

  const maxRequests = Math.max(1, ...requestsByMonth.map((r) => r.count));
  const maxRevenue = Math.max(1, ...revenueByDay.map((d) => d.amount));
  const conversionPct = stats.totalJobs ? Math.round((stats.completedJobs / stats.totalJobs) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Row 1: Website Analytics + Referral + Conversion */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Website Analytics card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Request analytics</h3>
          <div className="mt-4 flex flex-wrap justify-around gap-4">
            <div className="text-center">
              <div className="relative mx-auto h-14 w-14">
                <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.084 a 15.916 15.916 0 0 1 0 31.832 a 15.916 15.916 0 0 1 0 -31.832" />
                  <path className="text-emerald-500" stroke="currentColor" strokeWidth="3" strokeDasharray={`${(stats.totalRequests / Math.max(stats.totalRequests, 1)) * 100}, 100`} fill="none" d="M18 2.084 a 15.916 15.916 0 0 1 0 31.832 a 15.916 15.916 0 0 1 0 -31.832" />
                </svg>
              </div>
              <p className="mt-1 text-lg font-bold text-slate-900">{stats.totalRequests}</p>
              <p className="text-xs text-slate-500">Requests</p>
            </div>
            <div className="text-center">
              <div className="relative mx-auto h-14 w-14">
                <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.084 a 15.916 15.916 0 0 1 0 31.832 a 15.916 15.916 0 0 1 0 -31.832" />
                  <path className="text-amber-500" stroke="currentColor" strokeWidth="3" strokeDasharray={`${(stats.totalQuotes / Math.max(stats.totalRequests, 1)) * 100}, 100`} fill="none" d="M18 2.084 a 15.916 15.916 0 0 1 0 31.832 a 15.916 15.916 0 0 1 0 -31.832" />
                </svg>
              </div>
              <p className="mt-1 text-lg font-bold text-slate-900">{stats.totalQuotes}</p>
              <p className="text-xs text-slate-500">Quotes</p>
            </div>
            <div className="text-center">
              <div className="relative mx-auto h-14 w-14">
                <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.084 a 15.916 15.916 0 0 1 0 31.832 a 15.916 15.916 0 0 1 0 -31.832" />
                  <path className="text-blue-500" stroke="currentColor" strokeWidth="3" strokeDasharray={`${conversionPct}, 100`} fill="none" d="M18 2.084 a 15.916 15.916 0 0 1 0 31.832 a 15.916 15.916 0 0 1 0 -31.832" />
                </svg>
              </div>
              <p className="mt-1 text-lg font-bold text-slate-900">{conversionPct}%</p>
              <p className="text-xs text-slate-500">Job rate</p>
            </div>
          </div>
          <div className="mt-4 flex h-24 items-end justify-between gap-1">
            {requestsByMonth.map((r) => (
              <div key={r.month} className="flex-1 rounded-t bg-blue-100" style={{ height: `${(r.count / maxRequests) * 100}%` }} title={`${r.count}`} />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            {requestsByMonth.map((r) => (
              <span key={r.month}>{r.month}</span>
            ))}
          </div>
        </div>

        {/* Referral / Revenue card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalRevenue)}</p>
          <p className="text-sm text-slate-500">Total revenue</p>
          <div className="mt-3 h-12 w-full overflow-hidden rounded bg-slate-100">
            <div className="h-full w-full rounded bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-80" style={{ clipPath: 'polygon(0 100%, 5% 80%, 10% 90%, 20% 70%, 30% 85%, 40% 60%, 50% 75%, 60% 65%, 70% 80%, 80% 55%, 90% 70%, 100% 50%, 100% 100%)' }} />
          </div>
        </div>

        {/* Conversion card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.completedJobs}</p>
              <p className="text-sm text-slate-500">Completed jobs</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                {conversionPct}% of total jobs
              </p>
            </div>
            <div className="flex h-16 gap-0.5">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="w-2 rounded-sm bg-blue-400" style={{ height: `${30 + (i % 3) * 20}%` }} />
              ))}
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={`o${i}`} className="w-2 rounded-sm bg-amber-400" style={{ height: `${40 + (i % 2) * 15}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Impression (donut) + Individual metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Requests by category - donut */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <p className="text-xl font-bold text-slate-900">{stats.totalRequests}</p>
          <p className="text-sm text-slate-500">Requests by category</p>
          <div
            className="mx-auto mt-3 h-24 w-24 rounded-full border-4 border-slate-100"
            style={{
              background: requestsByCategory.length
                ? `conic-gradient(${requestsByCategory.map((c, i) => {
                    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
                    const start = requestsByCategory.slice(0, i).reduce((s, x) => s + x.count, 0);
                    return `${colors[i % colors.length]} ${start}% ${start + c.count}%`;
                  }).join(', ')})`
                : '#e5e7eb',
            }}
          />
          <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs">
            {requestsByCategory.slice(0, 5).map((c, i) => {
              const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-red-500', 'bg-violet-500'];
              return (
                <span key={c.category} className="flex items-center gap-1">
                  <span className={`h-2 w-2 rounded-full ${colors[i % colors.length]}`} />
                  {c.category} {c.count}%
                </span>
              );
            })}
          </div>
        </div>

        {/* Conversion metric */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Users className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(stats.monthRevenue)}</p>
              <p className="text-sm text-slate-500">This month</p>
            </div>
          </div>
          <div className="mt-3 h-8 w-full overflow-hidden rounded bg-slate-100">
            <div className="h-full rounded bg-blue-500" style={{ width: `${Math.min(100, (stats.monthRevenue / Math.max(stats.totalRevenue, 1)) * 100)}%` }} />
          </div>
        </div>

        {/* Income metric */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <DollarSign className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-sm text-slate-500">Income</p>
            </div>
          </div>
          <div className="mt-3 h-8 w-full overflow-hidden rounded bg-slate-100">
            <div className="h-full rounded bg-amber-500" style={{ width: stats.totalRevenue ? '100%' : '0%' }} />
          </div>
        </div>
      </div>

      {/* Row 3: Activity + Profit Report + Registration + Sales + Growth */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Activity card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-4">
          <h3 className="text-base font-semibold text-slate-900">Activity</h3>
          <div className="mt-4 space-y-4">
            {[
              { label: 'Total sales', value: formatCurrency(activity.totalSales), icon: BarChart3, color: 'bg-blue-500', pct: activity.income ? Math.min(100, (activity.totalSales / activity.income) * 100) : 0 },
              { label: 'Income', value: formatCurrency(activity.income), icon: DollarSign, color: 'bg-emerald-500', pct: 100 },
              { label: 'Invoices paid', value: String(activity.invoices), icon: FileText, color: 'bg-amber-500', pct: Math.min(100, activity.invoices * 10) },
              { label: 'Jobs completed', value: String(activity.tasks), icon: Briefcase, color: 'bg-red-500', pct: Math.min(100, activity.tasks * 15) },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <item.icon className="h-4 w-4 text-slate-400" />
                    {item.label}
                  </span>
                  <span className="font-medium text-slate-900">{item.value}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profit Report */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h3 className="text-base font-semibold text-slate-900">Revenue</h3>
          <div className="mt-4 flex items-center justify-between gap-2">
            <div>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(stats.monthRevenue)}</p>
              <p className="text-xs text-slate-500">This month</p>
            </div>
            <div className="h-12 w-12 shrink-0 rounded-full border-4 border-slate-200" style={{ background: `conic-gradient(#10b981 0% ${Math.min(100, Math.max(0, growthPct + 50))}%, #e5e7eb ${Math.min(100, Math.max(0, growthPct + 50))}% 100%)` }} />
          </div>
          <div className="mt-3">
            <p className="text-lg font-bold text-slate-900">{formatCurrency(stats.totalRevenue)}</p>
            <p className="text-xs text-slate-500">All time</p>
          </div>
        </div>

        {/* Registration / Users */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h3 className="text-base font-semibold text-slate-900">Users</h3>
          <p className="mt-2 text-2xl font-bold text-slate-900">{stats.totalUsers}</p>
          <p className="flex items-center gap-1 text-sm text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            {userGrowthPct > 0 ? '+' : ''}{userGrowthPct}%
          </p>
          <div className="mt-3 flex h-8 gap-0.5">
            {revenueByDay.map((d, i) => (
              <div key={d.day} className="flex-1 rounded-sm bg-blue-200" style={{ height: `${(d.amount / maxRevenue) * 100}%` }} />
            ))}
          </div>
        </div>

        {/* Sales - last 7 days */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-4">
          <h3 className="text-base font-semibold text-slate-900">Sales</h3>
          <p className="text-sm text-slate-500">Last 7 days</p>
          <div className="mt-4 flex h-24 items-end justify-between gap-1">
            {revenueByDay.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center">
                <div className="w-full rounded-t bg-blue-500" style={{ height: `${(d.amount / maxRevenue) * 100}%`, minHeight: '4px' }} title={formatCurrency(d.amount)} />
                <span className="mt-1 text-xs text-slate-500">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-xs">
            <span className="text-slate-600">↑ Best: {formatCurrency(Math.max(...revenueByDay.map((d) => d.amount)))}</span>
            <span className="text-slate-600">↓ Lowest: {formatCurrency(Math.min(...revenueByDay.map((d) => d.amount)))}</span>
          </div>
        </div>
      </div>

      {/* Growth card - full width or part of row */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-2xl font-bold text-slate-900">{growthPct > 0 ? '+' : ''}{growthPct}%</p>
            <p className="text-sm text-slate-500">Revenue growth vs last month</p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-slate-100 text-2xl font-bold text-blue-600" style={{ background: `conic-gradient(#3b82f6 0% ${Math.min(100, Math.max(0, growthPct + 50))}%, #e5e7eb ${Math.min(100, Math.max(0, growthPct + 50))}% 100%)` }}>
            {growthPct}%
          </div>
          <p className="text-sm text-slate-500">Based on paid invoices this month vs previous month.</p>
        </div>
      </div>
    </div>
  );
}
