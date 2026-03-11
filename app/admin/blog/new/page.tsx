import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ArrowLeft } from 'lucide-react';

export default function AdminBlogNewPage() {
  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>
      </div>
      <AdminPageHeader
        title="New post"
        description="Create a new blog post. Form coming soon."
      />
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <p className="text-slate-500">Blog post editor will be added here.</p>
      </div>
    </div>
  );
}
