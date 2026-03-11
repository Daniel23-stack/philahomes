import { Award, DollarSign, Shield } from 'lucide-react';

const highlights = [
  {
    icon: Award,
    title: 'Certified Professionals',
    description: 'Our team is qualified and experienced across all service categories.',
    accent: 'primary', // bg uses primary
  },
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    description: 'Transparent quotes and competitive rates with no hidden costs.',
    accent: 'accent',
  },
  {
    icon: Shield,
    title: 'Reliable Service',
    description: 'We show up on time and deliver quality work you can count on.',
    accent: 'highlight',
  },
];

const accentStyles = {
  primary: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  accent: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]',
  highlight: 'bg-[var(--color-highlight)]/20 text-amber-800',
};

export function HighlightsSection() {
  return (
    <section className="border-t border-slate-200 bg-white py-20 sm:py-28" aria-labelledby="highlights-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered header - clear value proposition */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)] opacity-0 animate-fade-in-up">
            Why choose us
          </p>
          <h2 id="highlights-heading" className="mt-2 text-center text-3xl font-light text-slate-900 sm:text-4xl opacity-0 animate-fade-in-up animate-delay-200">
            Expertise, fair pricing, reliability
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-slate-700 opacity-0 animate-fade-in-up animate-delay-300">
            We bring all three to every job — so you get quality work without the guesswork.
          </p>
        </div>

        {/* Feature cards - inspired by Bolddesk, MediaFire, Ente: icons + cards + shadow */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {highlights.map((item, i) => (
            <div
              key={item.title}
              className="group relative rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm opacity-0 animate-fade-in-up transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/40"
              style={{ animationDelay: `${350 + i * 100}ms` }}
            >
              <span
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${accentStyles[item.accent as keyof typeof accentStyles]} transition duration-300 group-hover:scale-105`}
                aria-hidden
              >
                <item.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
