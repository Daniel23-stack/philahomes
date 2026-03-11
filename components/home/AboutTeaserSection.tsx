import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function AboutTeaserSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)] opacity-0 animate-fade-in-up">
          Who we are
        </p>
        <h2 className="mt-2 text-3xl font-light text-slate-900 sm:text-4xl opacity-0 animate-fade-in-up animate-delay-200">
          About us
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-700 opacity-0 animate-fade-in-up animate-delay-300">
          We are a team of qualified professionals with experience across residential and commercial projects. We work with you and, where needed, with municipalities to ensure work is done safely and to standard.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 opacity-0 animate-fade-in-up animate-delay-400">
          From leak repairs and electrical upgrades to full renovations and solar installations — one point of contact for your home.
        </p>
        <Link
          href="/about"
          className="mt-8 inline-flex items-center gap-2 font-medium text-[var(--color-primary)] opacity-0 animate-fade-in-up transition hover:translate-x-1 hover:underline animate-delay-500"
        >
          Read more
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
