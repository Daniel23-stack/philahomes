import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ArrowLeft } from 'lucide-react';
import { RequestStatusForm } from '@/components/admin/RequestStatusForm';

type Props = { params: Promise<{ id: string }> };

export default async function AdminRequestDetailPage({ params }: Props) {
  const { id } = await params;
  let request: {
    id: string;
    serviceCategory: string;
    subService: string | null;
    description: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string | null;
    status: string;
    imageUrls: string | null;
    createdAt: Date;
    quotes: { id: string; amount: number | null; status: string }[];
  } | null = null;

  try {
    request = await prisma.serviceRequest.findUnique({
      where: { id },
      select: {
        id: true,
        serviceCategory: true,
        subService: true,
        description: true,
        contactName: true,
        contactEmail: true,
        contactPhone: true,
        status: true,
        imageUrls: true,
        createdAt: true,
        quotes: { select: { id: true, amount: true, status: true } },
      },
    });
  } catch {
    // DB error
  }

  if (!request) notFound();

  return (
    <div>
      <Link
        href="/admin/requests"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to requests
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold capitalize text-slate-900">{request.serviceCategory}</h1>
            {request.subService && (
              <p className="mt-1 text-sm text-slate-500">Sub-service: {request.subService}</p>
            )}
            <p className="mt-2 text-sm text-slate-500">
              Submitted{' '}
              {new Date(request.createdAt).toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Contact</h2>
            <p className="mt-2 font-medium text-slate-900">{request.contactName}</p>
            <p className="text-slate-600">{request.contactEmail}</p>
            {request.contactPhone && <p className="text-slate-600">{request.contactPhone}</p>}
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Quotes linked</h2>
            {request.quotes.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">None yet</p>
            ) : (
              <ul className="mt-2 space-y-1 text-sm">
                {request.quotes.map((q) => (
                  <li key={q.id}>
                    Quote {q.id.slice(0, 8)}… — {q.amount != null ? `R ${q.amount.toLocaleString('en-ZA')}` : 'TBD'} ({q.status})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Description</h2>
          <p className="mt-2 whitespace-pre-wrap text-slate-700">{request.description}</p>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6">
          <h2 className="text-sm font-semibold text-slate-900">Update workflow</h2>
          <RequestStatusForm requestId={request.id} currentStatus={request.status} />
        </div>
      </div>
    </div>
  );
}
