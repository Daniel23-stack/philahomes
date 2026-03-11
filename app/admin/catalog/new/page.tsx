import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminCatalogNewPage() {
  return (
    <div>
      <Link href="/admin/catalog" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" />
        Back to catalog
      </Link>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Add catalog item</h1>
        <p className="mt-2 text-slate-500">Form to create a new service offering with base price and add-ons coming soon.</p>
      </div>
    </div>
  );
}
