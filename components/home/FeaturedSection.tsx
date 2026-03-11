import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const FEATURED_IMAGE = 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80';

export function FeaturedSection() {
  return (
    <section className="border-t border-slate-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Image
              src={FEATURED_IMAGE}
              alt="Home extension and renovation"
              fill
              className="object-cover transition duration-500 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Featured
            </p>
            <h2 className="mt-2 text-3xl font-light text-slate-900 sm:text-4xl">
              Extending and improving your home can bring enormous benefits to your lifestyle.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-700">
              If you are contemplating construction or renovation, we are the team equipped to guide you through the process — from design and planning to plumbing, electrical, and finishing. Retaining a trusted partner is not only good sense; it can also be a requirement for compliance and quality.
            </p>
            <Link
              href="/request-quote"
              className="mt-8 inline-flex items-center gap-2 bg-[var(--color-primary)] px-6 py-3.5 font-medium text-white transition hover:scale-[1.02] hover:opacity-95"
            >
              Get a quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
