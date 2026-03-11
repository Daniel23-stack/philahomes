import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

function formatCurrency(amount: number | null) {
  if (amount == null) return '—';
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(amount);
}

export default async function AdminCatalogItemPage({ params }: { params: { id: string } }) {
  const item = await prisma.catalogItem.findUnique({
    where: { id: params.id },
    include: { addOns: true },
  });
  if (!item) notFound();

  return (
    <div>
      <Link href="/admin/catalog" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" />
        Back to catalog
      </Link>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">{item.name}</h1>
        <p className="mt-1 text-sm text-slate-500">{item.serviceCategory.replace(/-/g, ' ')}</p>
        {item.description && <p className="mt-3 text-slate-600">{item.description}</p>}
        <p className="mt-3 font-medium text-slate-900">Base price: {formatCurrency(item.basePrice)}</p>
        {item.isRetired && <p className="mt-2 text-sm text-amber-600">Retired</p>}
        {item.addOns.length > 0 && (
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-slate-700">Add-ons</h2>
            <ul className="mt-2 space-y-1">
              {item.addOns.map((a) => (
                <li key={a.id} className="flex justify-between text-sm">
                  <span>{a.name}</span>
                  <span>{formatCurrency(a.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="mt-6 text-sm text-slate-500">Edit form coming soon.</p>
      </div>
    </div>
  );
}
