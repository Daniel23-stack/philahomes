import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { FEATURED_PORTFOLIO } from '@/data/portfolio';
import { SERVICES } from '@/data/services';

export function LatestProjectSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-28" aria-labelledby="latest-project-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="opacity-0 animate-fade-in-up text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Our work
            </p>
            <h2 id="latest-project-heading" className="mt-2 opacity-0 animate-fade-in-up text-3xl font-light text-slate-900 sm:text-4xl animate-delay-200">
              Latest projects
            </h2>
            <p className="mt-6 max-w-xl opacity-0 animate-fade-in-up text-base leading-relaxed text-slate-700 animate-delay-300">
              Planning, design, and execution across plumbing, electrical, renovations, and solar.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex shrink-0 items-center gap-2 font-medium text-[var(--color-accent)] opacity-0 animate-fade-in-up transition hover:gap-3 hover:text-[var(--color-primary)] animate-delay-400"
          >
            See full portfolio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Featured project cards - interactive hover overlay + image zoom */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {FEATURED_PORTFOLIO.map((item, i) => {
            const service = SERVICES.find((s) => s.slug === item.category);
            return (
              <Link
                key={item.id}
                href="/portfolio"
                className="group relative block overflow-hidden rounded-2xl bg-slate-200 opacity-0 shadow-md animate-fade-in-up transition-shadow hover:shadow-xl"
                style={{ animationDelay: `${400 + i * 80}ms` }}
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  {/* Gradient overlay on hover */}
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  {/* Content overlay - visible on hover (and slightly always for readability) */}
                  <span className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-800 backdrop-blur-sm w-fit">
                      {service?.name ?? item.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-white drop-shadow-md sm:text-xl">
                      {item.title}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-white/95 transition group-hover:gap-3">
                      View project
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
