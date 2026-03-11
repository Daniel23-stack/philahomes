'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { SERVICES } from '@/data/services';
import type { Service } from '@/data/services';

export function Header() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const role = (session?.user as { role?: string })?.role;
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<Service | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
        setHoveredService(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200/80 bg-white/95 shadow-lg shadow-slate-200/50 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5 lg:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="text-xl font-bold text-[var(--color-primary)] sm:text-2xl">
              Phila<span className="text-[var(--color-accent)]">Homes</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            <Link
              href="/"
              className="rounded-xl px-3.5 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Home
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesOpen((o) => !o)}
                className="flex items-center gap-1 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                aria-expanded={servicesOpen ? 'true' : 'false'}
                aria-haspopup="true"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 flex rounded-xl border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-200/50 backdrop-blur-md">
                {/* First column: main services */}
                <div className="w-56 border-r border-slate-100 py-2">
                  {SERVICES.map((service) => (
                    <div
                      key={service.slug}
                      className="relative"
                      onMouseEnter={() => setHoveredService(service)}
                      onMouseLeave={() => setHoveredService(null)}
                    >
                      <Link
                        href={`/services/${service.slug}`}
                        className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium transition ${
                          hoveredService?.slug === service.slug
                            ? 'bg-slate-100 text-[var(--color-primary)]'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                        onClick={() => setServicesOpen(false)}
                      >
                        {service.name}
                        <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                      </Link>
                    </div>
                  ))}
                  <Link
                    href="/services"
                    className="mt-2 block border-t border-slate-100 px-4 py-2.5 text-sm font-medium text-[var(--color-accent)] hover:bg-slate-50"
                    onClick={() => setServicesOpen(false)}
                  >
                    View all services
                  </Link>
                </div>
                {/* Second column: cascading sub-services */}
                {hoveredService && (
                  <div className="min-w-[200px] py-2 pr-2">
                    <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {hoveredService.name}
                    </p>
                    {hoveredService.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/services/${hoveredService.slug}#${sub.id}`}
                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[var(--color-accent)]"
                        onClick={() => setServicesOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
            <Link
              href="/about"
              className="rounded-xl px-3.5 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="rounded-xl px-3.5 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Contact
            </Link>
            {role === 'admin' && (
              <Link
                href="/admin"
                className="rounded-xl px-3.5 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Admin
              </Link>
            )}
            {session && role !== 'admin' && (
              <Link
                href="/dashboard"
                className="rounded-xl px-3.5 py-2.5 text-base font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/request-quote"
              className="ml-2 rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-95"
            >
              Request a Quote
            </Link>
            {session && (
              <button
                type="button"
                onClick={() => signOut()}
                className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                Sign out
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav - inside same floating card */}
        {mobileOpen && (
          <div className="border-t border-slate-200/80 px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-0.5">
              <Link
                href="/"
                className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                Services
              </Link>
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-xl py-2.5 pl-8 pr-3.5 text-sm text-slate-500 hover:bg-slate-100"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.name}
                </Link>
              ))}
              <Link
                href="/about"
                className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/request-quote"
                className="mt-2 rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-center text-sm font-medium text-white"
                onClick={() => setMobileOpen(false)}
              >
                Request a Quote
              </Link>
              {session && (
                <>
                  <Link
                    href={role === 'admin' ? '/admin' : '/dashboard'}
                    className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    {role === 'admin' ? 'Admin' : 'Dashboard'}
                  </Link>
                  <button
                    type="button"
                    onClick={() => { signOut(); setMobileOpen(false); }}
                    className="rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-100"
                  >
                    Sign out
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
