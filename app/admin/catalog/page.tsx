import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Package, Plus, Tag, ArrowRight } from 'lucide-react';

function formatCurrency(amount: number | null) {
  if (amount == null) return '—';
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(amount);
}

function categoryLabel(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function AdminCatalogPage() {
  let items: {
    id: string;
    serviceCategory: string;
    name: string;
    description: string | null;
    basePrice: number | null;
    isRetired: boolean;
    order: number;
    addOns: { id: string; name: string; price: number }[];
  }[] = [];
  let stats = { total: 0, active: 0, retired: 0 };

  try {
    items = await prisma.catalogItem.findMany({
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
      include: { addOns: { select: { id: true, name: true, price: true } } },
    });
    stats.total = items.length;
    stats.active = items.filter((i) => !i.isRetired).length;
    stats.retired = items.filter((i) => i.isRetired).length;
  } catch {
    // DB not ready
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Catalog</h1>
          <p className="mt-1 text-slate-500">Manage service catalog, prices, and add-ons.</p>
        </div>
        <Link
          href="/admin/catalog/new"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Add item
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          <p className="text-sm font-medium text-slate-600">Total items</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-emerald-600">{stats.active}</p>
          <p className="text-sm font-medium text-slate-600">Active</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-slate-500">{stats.retired}</p>
          <p className="text-sm font-medium text-slate-600">Retired</p>
        </div>
      </div>

      {/* Catalog list */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Package className="h-7 w-7" />
            </span>
            <p className="mt-4 font-medium text-slate-900">No catalog items yet</p>
            <p className="mt-1 text-sm text-slate-500">Add service offerings with base prices and add-ons.</p>
            <Link
              href="/admin/catalog/new"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" />
              Add first item
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {items.map((item) => (
              <li key={item.id} className="transition hover:bg-slate-50/50">
                <div className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{item.name}</h3>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                        {categoryLabel(item.serviceCategory)}
                      </span>
                      {item.isRetired && (
                        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
                          Retired
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                      <span className="font-medium text-slate-700">Base: {formatCurrency(item.basePrice)}</span>
                      {item.addOns.length > 0 && (
                        <span className="flex items-center gap-1 text-slate-500">
                          <Tag className="h-3.5 w-3.5" />
                          {item.addOns.length} add-on{item.addOns.length !== 1 ? 's' : ''}
                          {item.addOns.slice(0, 3).map((a) => (
                            <span key={a.id} className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
                              {a.name} {formatCurrency(a.price)}
                            </span>
                          ))}
                          {item.addOns.length > 3 && (
                            <span className="text-xs">+{item.addOns.length - 3} more</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/admin/catalog/${item.id}`}
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      Edit
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
