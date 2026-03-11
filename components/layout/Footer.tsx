import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/site';

const whatsappUrl = `https://wa.me/${SITE.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hi PhilaHomes, I have an enquiry.')}`;

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[var(--color-primary)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold tracking-tight">
              Phila<span className="text-[var(--color-accent)]">Homes</span>
            </h3>
            <p className="mt-2 text-base leading-relaxed text-slate-200">{SITE.tagline}</p>
          </div>
          <div>
            <h4 className="text-base font-semibold">Contact</h4>
            <ul className="mt-3 space-y-2.5 text-base leading-relaxed text-slate-200">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                {SITE.address}
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-2 hover:text-[var(--color-accent)]"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 hover:text-[var(--color-accent)]"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold">Quick links</h4>
            <ul className="mt-3 space-y-2.5 text-base leading-relaxed text-slate-200">
              <li>
                <Link href="/services" className="hover:text-[var(--color-accent)]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--color-accent)]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--color-accent)]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/request-quote" className="hover:text-[var(--color-accent)]">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[var(--color-accent)]">
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold">Get in touch</h4>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-base font-medium text-white hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <div className="mt-4 flex gap-4">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Facebook"
              >
                <span className="text-base font-medium">Facebook</span>
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Instagram"
              >
                <span className="text-base font-medium">Instagram</span>
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <span className="text-base font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-600 pt-6 text-center text-base text-slate-300">
          © {new Date().getFullYear()} PhilaHomes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
