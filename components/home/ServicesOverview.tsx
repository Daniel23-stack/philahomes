import Link from 'next/link';
import { Wrench, Zap, Home, Palette, Box, Hammer, Flame, Sun, ArrowRight } from 'lucide-react';
import { SERVICES } from '@/data/services';

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

export function ServicesOverview() {
  return (
    <section className="border-t border-slate-200 bg-slate-50/80 py-20 sm:py-28" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered section header - inspiration: home services landing pages */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="opacity-0 animate-fade-in-up text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            What we do
          </p>
          <h2 id="services-heading" className="mt-2 opacity-0 animate-fade-in-up text-3xl font-light text-slate-900 sm:text-4xl animate-delay-200">
            Our Services
          </h2>
          <p className="mt-6 opacity-0 animate-fade-in-up text-base leading-relaxed text-slate-700 animate-delay-300">
            Full-service team that delivers plumbing, electrical, renovations, and more — one trusted partner for every home improvement.
          </p>
        </div>

        {/* Card grid - modern service cards with shadow and hover lift */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.slug] ?? Wrench;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 opacity-0 shadow-sm animate-fade-in-up transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
                style={{ animationDelay: `${400 + i * 50}ms` }}
              >
                {/* Icon in rounded container - gradient accent on hover */}
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-slate-900 transition group-hover:text-[var(--color-primary)]">
                  {service.name}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {service.shortDescription}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] transition group-hover:gap-3">
                  Learn more
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Primary CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3.5 font-medium text-white shadow-md transition hover:scale-[1.02] hover:bg-[var(--color-accent)]/95 hover:shadow-lg"
          >
            View all services
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
