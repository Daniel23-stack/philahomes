import type { Metadata } from 'next';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Request a quote for plumbing, electrical, renovations, solar and more. PhilaHomes, Johannesburg.',
};

export default function RequestQuotePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="section-heading">Request a Quote</h1>
      <p className="mt-3 text-gray-600">
        Tell us what you need and we&apos;ll get back to you with a quote.
      </p>
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <QuoteRequestForm />
      </div>
    </div>
  );
}
