'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '@/data/portfolio';
import { SERVICES } from '@/data/services';

const ALL = 'all';

export function PortfolioGallery() {
  const [filter, setFilter] = useState<string>(ALL);

  const categories = useMemo(() => {
    const slugs = Array.from(new Set(PORTFOLIO_ITEMS.map((p) => p.category)));
    return slugs.map((slug) => ({
      slug,
      name: SERVICES.find((s) => s.slug === slug)?.name ?? slug,
    }));
  }, []);

  const filtered = useMemo(
    () => (filter === ALL ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div className="space-y-10">
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter(ALL)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filter === ALL
              ? 'bg-[var(--color-primary)] text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setFilter(cat.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === cat.slug
                ? 'bg-[var(--color-primary)] text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Project grid - hover overlay + image zoom */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => {
          const service = SERVICES.find((s) => s.slug === item.category);
          return (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <span className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <span className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-slate-800 w-fit backdrop-blur-sm">
                    {service?.name ?? item.category}
                  </span>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-200">
                    {item.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white">
                    View details
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-accent)]">
                  {service?.name ?? item.category}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-slate-600">{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-slate-500">No projects in this category yet.</p>
      )}
    </div>
  );
}
