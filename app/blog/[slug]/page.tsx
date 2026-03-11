import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post?.publishedAt) return { title: 'Blog' };
    return { title: post.title, description: post.excerpt ?? undefined };
  } catch {
    return { title: 'Blog' };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post: { title: string; body: string; publishedAt: Date | null } | null = null;
  try {
    post = await prisma.post.findUnique({
      where: { slug },
      select: { title: true, body: true, publishedAt: true },
    });
  } catch {
    // DB not ready
  }
  if (!post || !post.publishedAt) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/blog" className="text-sm text-[var(--color-accent)] hover:underline">
        ← Blog
      </Link>
      <h1 className="mt-4 section-heading">{post.title}</h1>
      {post.publishedAt && (
        <p className="mt-2 text-sm text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      )}
      <div className="mt-8 prose prose-gray max-w-none">
        {post.body.split('\n').map((p, i) => (
          <p key={i} className="mb-4">
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
