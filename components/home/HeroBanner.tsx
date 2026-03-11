import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80';

export function HeroBanner() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Home maintenance and renovation"
          fill
          className="object-cover object-center opacity-50"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-900/80" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 pb-24 pt-32 text-left sm:px-6 lg:px-8 lg:justify-center lg:pb-32 lg:pt-24">
        <p className="opacity-0 animate-fade-in-up text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-highlight)] animate-delay-200">
          Home services & renovations
        </p>
        <h1 className="mt-3 max-w-3xl opacity-0 animate-fade-in-up text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl animate-delay-300">
          Make every home inspiration{' '}
          <span className="font-semibold text-[var(--color-accent)]">a reality.</span>
        </h1>
        <p className="mt-6 max-w-xl opacity-0 animate-fade-in-up text-lg leading-relaxed text-slate-200 animate-delay-400">
          From plumbing and electrical to renovations and solar — one trusted team for your home.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6 opacity-0 animate-fade-in-up animate-delay-500">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 bg-[var(--color-accent)] px-6 py-3.5 font-medium text-white transition hover:opacity-95 hover:scale-[1.02]"
          >
            See more
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link
            href="/request-quote"
            className="inline-flex items-center border border-white/50 px-6 py-3.5 font-medium text-white transition hover:bg-white hover:text-slate-900 hover:scale-[1.02]"
          >
            Request a quote
          </Link>
        </div>
      </div>
    </section>
  );
}
