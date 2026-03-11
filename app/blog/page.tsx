import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips and guides from PhilaHomes — solar PV maintenance, plumbing, electrical and more.',
};

export default async function BlogPage() {
  let posts: { slug: string; title: string; excerpt: string | null; publishedAt: Date | null }[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
      select: { slug: true, title: true, excerpt: true, publishedAt: true },
    });
  } catch {
    // DB may not be migrated yet
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="section-heading">Blog</h1>
      <p className="mt-3 text-gray-600">
        Tips and guides for home maintenance and renovation.
      </p>
      <div className="mt-12 space-y-6">
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Check back soon.</p>
        ) : (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h2 className="font-semibold text-[var(--color-primary)]">{post.title}</h2>
              {post.excerpt && <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>}
              {post.publishedAt && (
                <p className="mt-2 text-xs text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
