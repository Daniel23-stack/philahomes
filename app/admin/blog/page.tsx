import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { FileEdit, Plus } from 'lucide-react';

export default async function AdminBlogPage() {
  let posts: { id: string; title: string; slug: string; publishedAt: Date | null }[] = [];
  try {
    posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, slug: true, publishedAt: true },
    });
  } catch {
    // DB not ready
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminPageHeader
          title="Blog"
          description="Create and publish tips and guides."
        />
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <AdminEmptyState
          icon={FileEdit}
          title="No posts yet"
          description="Create your first blog post to get started."
        />
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <ul className="divide-y divide-slate-200">
            {posts.map((p) => (
              <li key={p.id} className="flex items-center justify-between px-6 py-4 transition hover:bg-slate-50/50">
                <div>
                  <p className="font-medium text-slate-900">{p.title}</p>
                  <p className="text-sm text-slate-500">/{p.slug}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    p.publishedAt ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {p.publishedAt ? 'Published' : 'Draft'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
