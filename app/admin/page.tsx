import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { FileText, MessageSquare, Briefcase, Users, ArrowRight, TrendingUp } from 'lucide-react';

const statCards = [
  { key: 'requests', label: 'Service requests', sublabel: 'Total requests', icon: FileText, href: '/admin/requests', color: 'bg-blue-500' },
  { key: 'quotes', label: 'Quotes', sublabel: 'Sent & pending', icon: MessageSquare, href: '/admin/quotes', color: 'bg-emerald-500' },
  { key: 'jobs', label: 'Jobs', sublabel: 'Active & completed', icon: Briefcase, href: '/admin/jobs', color: 'bg-amber-500' },
  { key: 'users', label: 'Users', sublabel: 'Registered clients', icon: Users, href: '#', color: 'bg-violet-500' },
];

export default async function AdminPage() {
  let counts = { requests: 0, quotes: 0, jobs: 0, users: 0 };
  try {
    const [requests, quotes, jobs, users] = await Promise.all([
      prisma.serviceRequest.count(),
      prisma.quote.count(),
      prisma.job.count(),
      prisma.user.count(),
    ]);
    counts = { requests, quotes, jobs, users };
  } catch {
    // DB not ready
  }

  return (
    <div>
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back!</h1>
            <p className="mt-1 text-slate-500">Here’s what’s happening with PhilaHomes today.</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">Dashboard overview</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const value = counts[card.key as keyof typeof counts];
          const Icon = card.icon;
          const isLink = card.href !== '#';
          const cardContent = (
            <>
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                {isLink && (
                  <span className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600" aria-hidden>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-700">{card.label}</p>
              <p className="text-xs text-slate-500">{card.sublabel}</p>
            </>
          );
          const cardWrapperClass = 'overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md';
          return isLink ? (
            <Link key={card.key} href={card.href} className={`block ${cardWrapperClass}`}>
              <span className="block">{cardContent}</span>
            </Link>
          ) : (
            <div key={card.key} className={cardWrapperClass}>
              {cardContent}
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/admin/requests"
              className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              View requests
            </Link>
            <Link
              href="/admin/blog"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Manage blog
            </Link>
            <Link
              href="/admin/invoices"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Invoices
            </Link>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
          <p className="mt-2 text-sm text-slate-500">
            Service requests, quotes, and jobs are managed from the sidebar. Use Analytics for trends and Logs for activity.
          </p>
        </div>
      </div>
    </div>
  );
}
