import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { Wrench, Zap, Home, Palette, Box, Hammer, Flame, Sun } from 'lucide-react';

const serviceImages: Record<string, string> = {
  plumbing: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1200&q=80',
  electrical: 'https://images.unsplash.com/photo-1621905252507-854286f609c2?w=1200&q=80',
  renovations: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
  'interior-design': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
  bricklaying: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=1200&q=80',
  'general-maintenance': 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=80',
  welding: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80',
  solar: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=80',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  plumbing: Wrench,
  electrical: Zap,
  renovations: Home,
  'interior-design': Palette,
  bricklaying: Box,
  'general-maintenance': Hammer,
  welding: Flame,
  solar: Sun,
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service' };
  return {
    title: `${service.name} | PhilaHomes`,
    description: `${service.shortDescription} Affordable ${service.name.toLowerCase()} in Johannesburg.`,
    keywords: [`${service.name} Johannesburg`, 'PhilaHomes', service.slug],
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.slug] ?? Wrench;
  const imageUrl = serviceImages[service.slug] ?? serviceImages.renovations;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mb-10 h-56 overflow-hidden rounded-xl bg-gray-200 sm:h-72">
        <Image
          src={imageUrl}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
          priority
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <h1 className="section-heading">{service.name}</h1>
          <p className="mt-1 text-gray-600">{service.shortDescription}</p>
        </div>
      </div>

      {service.description && (
        <div className="mt-8 prose prose-gray max-w-none">
          <p>{service.description}</p>
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-[var(--color-primary)]">What we offer</h2>
        <ul className="mt-4 space-y-2">
          {service.subcategories.map((sub) => (
            <li key={sub.id} id={sub.id} className="flex items-center gap-2 text-gray-700">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              {sub.name}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/request-quote" className="btn-primary">
          Request a quote
        </Link>
        <Link href="/services" className="btn-secondary">
          All services
        </Link>
      </div>
    </div>
  );
}
