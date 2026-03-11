import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Eye, Users, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about PhilaHomes — our mission, vision, team, and certifications. Your trusted partner for plumbing, electrical, renovations and solar in Johannesburg.',
};

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80';
const TEAM_IMAGE = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80';

const values = [
  { title: 'Quality', description: 'We deliver workmanship that meets or exceeds industry standards.' },
  { title: 'Trust', description: 'Transparent communication and fair pricing on every job.' },
  { title: 'Reliability', description: 'We show up on time and complete work as agreed.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative border-b border-slate-200 bg-slate-900" aria-labelledby="about-heading">
        <div className="absolute inset-0">
          <Image
            src={ABOUT_IMAGE}
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-highlight)]">
            About us
          </p>
          <h1 id="about-heading" className="mt-2 max-w-3xl text-3xl font-light text-white sm:text-4xl lg:text-5xl">
            About PhilaHomes
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
            Your one-stop solution for home maintenance and renovation across Johannesburg and beyond. We bring together certified tradespeople and a single point of contact for your home.
          </p>
        </div>
      </section>

      {/* Mission & Vision - two cards */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-24" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="mission-heading" className="sr-only">Our mission and vision</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-8 shadow-sm transition hover:border-slate-300 hover:shadow-md">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <Target className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">Our Mission</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                To deliver reliable, affordable, and professional home services — from plumbing and electrical to renovations and solar — so every household can enjoy a safe, well-maintained home.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-8 shadow-sm transition hover:border-slate-300 hover:shadow-md">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <Eye className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">Our Vision</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                To be the most trusted name in home maintenance and renovation in our region, known for quality workmanship, fair pricing, and outstanding customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values - three pillars */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-24" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">What we stand for</p>
          <h2 id="values-heading" className="mt-2 text-3xl font-light text-slate-900 sm:text-4xl">
            Our values
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            These principles guide how we work with every client and on every job.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <CheckCircle2 className="h-6 w-6 shrink-0 text-[var(--color-primary)]" aria-hidden />
                <div className="ml-4">
                  <h3 className="font-semibold text-slate-900">{v.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-slate-600">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team - split image + text */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-24" aria-labelledby="team-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={TEAM_IMAGE}
                alt="PhilaHomes team collaboration"
                fill
                className="object-cover transition duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <Users className="h-6 w-6" aria-hidden />
              </span>
              <h2 id="team-heading" className="mt-4 text-3xl font-light text-slate-900 sm:text-4xl">
                Our team
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-700">
                Our team brings together certified plumbers, electricians, builders, and solar specialists. We are committed to ongoing training and adherence to industry standards so you get work you can rely on.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 font-medium text-[var(--color-primary)] transition hover:gap-3 hover:text-[var(--color-accent)]"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-24" aria-labelledby="certs-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-highlight)]/20 text-amber-800">
              <Award className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 id="certs-heading" className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Certifications & affiliations
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
                We work in line with local regulations and industry best practices. Our technicians are qualified in their respective trades, and we maintain strong relationships with suppliers and industry bodies to ensure quality and compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-primary)] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light sm:text-3xl">Ready to work with us?</h2>
          <p className="mt-3 text-slate-200">
            Request a quote or get in touch for any home service.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3.5 font-medium text-white transition hover:scale-[1.02] hover:opacity-95"
            >
              Request a quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/50 px-6 py-3.5 font-medium text-white transition hover:bg-white hover:text-slate-900"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
