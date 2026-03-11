import type { Metadata } from 'next';
import { PortfolioGallery } from '@/components/portfolio/PortfolioGallery';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Browse completed projects by PhilaHomes — plumbing, electrical, renovations, solar and more.',
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Our work
          </p>
          <h1 className="mt-2 text-3xl font-light text-slate-900 sm:text-4xl lg:text-5xl">
            Portfolio
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-700">
            A selection of completed projects across plumbing, electrical, renovations, solar, and more. Filter by category or browse all.
          </p>
        </div>
      </section>

      {/* Gallery with filter */}
      <section className="py-16 sm:py-20" aria-label="Project gallery">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PortfolioGallery />
        </div>
      </section>
    </main>
  );
}
