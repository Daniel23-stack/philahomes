import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactMap } from '@/components/contact/ContactMap';
import { ContactForm } from '@/components/forms/ContactForm';
import { SITE } from '@/lib/site';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with PhilaHomes for plumbing, electrical, renovations and solar. Johannesburg.',
};

const whatsappUrl = `https://wa.me/${SITE.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hi PhilaHomes, I have an enquiry.')}`;

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="section-heading">Contact Us</h1>
      <p className="mt-3 text-gray-600">
        Have a question or need a quote? Reach out — we&apos;re here to help.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-gray-600">
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-[var(--color-accent)]" />
              {SITE.address}
            </li>
            <li>
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 hover:text-[var(--color-accent)]">
                <Phone className="h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-[var(--color-accent)]">
                <Mail className="h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                {SITE.email}
              </a>
            </li>
          </ul>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>
          <div className="mt-8">
            <p className="text-sm font-medium text-gray-700">Follow us</p>
            <div className="mt-2 flex gap-4">
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:text-[var(--color-accent)]">
                Facebook
              </a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:text-[var(--color-accent)]">
                Instagram
              </a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:text-[var(--color-accent)]">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">Send an inquiry</h2>
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <ContactForm />
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Need a quote for a specific job?{' '}
            <Link href="/request-quote" className="font-medium text-[var(--color-accent)] hover:underline">
              Request a quote
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-[var(--color-primary)]">Find us</h2>
        <div className="mt-4">
          <ContactMap />
        </div>
      </div>
    </div>
  );
}
