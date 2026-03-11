import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/data/services';
import { Wrench, Zap, Home, Palette, Box, Hammer, Flame, Sun } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'PhilaHomes offers plumbing, electrical, renovations, interior design, bricklaying, general maintenance, welding and solar PV in Johannesburg.',
  keywords: ['plumbing Johannesburg', 'electrical services', 'renovations', 'solar PV', 'PhilaHomes'],
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

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="section-heading">Our Services</h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        From plumbing and electrical to renovations and solar — we cover all your home maintenance and renovation needs.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => {
          const Icon = iconMap[service.slug] ?? Wrench;
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-[var(--color-accent)] hover:shadow-md block"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white group-hover:bg-[var(--color-accent)]">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-accent)]">
                {service.name}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{service.shortDescription}</p>
              <span className="mt-3 inline-block text-sm font-medium text-[var(--color-accent)]">
                Learn more →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
