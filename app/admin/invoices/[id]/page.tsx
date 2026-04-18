import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ArrowLeft } from 'lucide-react';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(amount);
}

type Props = { params: Promise<{ id: string }> };

export default async function AdminInvoiceDetailPage({ params }: Props) {
  const { id } = await params;
  let invoice: {
    id: string;
    amount: number;
    status: string;
    dueDate: Date | null;
    paidAt: Date | null;
    pdfUrl: string | null;
    createdAt: Date;
    user: { name: string | null; email: string };
  } | null = null;

  try {
    invoice = await prisma.invoice.findUnique({
      where: { id },
      include: { user: { select: { name: true, email: true } } },
    });
  } catch {
    // DB error
  }

  if (!invoice) notFound();

  return (
    <div>
      <Link
        href="/admin/invoices"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to invoices
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Invoice</h1>
        <p className="mt-1 font-mono text-sm text-slate-500">{invoice.id}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-500">Client</dt>
            <dd className="mt-1 text-slate-900">{invoice.user.name || invoice.user.email}</dd>
            <dd className="text-sm text-slate-600">{invoice.user.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-500">Amount</dt>
            <dd className="mt-1 text-lg font-semibold text-slate-900">{formatCurrency(invoice.amount)}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-500">Status</dt>
            <dd className="mt-1 capitalize text-slate-800">{invoice.status}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-500">Due date</dt>
            <dd className="mt-1 text-slate-800">
              {invoice.dueDate
                ? new Date(invoice.dueDate).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : '—'}
            </dd>
          </div>
          {invoice.paidAt && (
            <div>
              <dt className="text-xs font-semibold uppercase text-slate-500">Paid at</dt>
              <dd className="mt-1 text-slate-800">
                {new Date(invoice.paidAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
              </dd>
            </div>
          )}
          {invoice.pdfUrl && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase text-slate-500">PDF</dt>
              <dd className="mt-1">
                <a href={invoice.pdfUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Open PDF
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
