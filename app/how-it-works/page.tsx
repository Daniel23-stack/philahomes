import type { Metadata } from 'next';
import Link from 'next/link';
import { StagesGuide } from '@/components/how-it-works/StagesGuide';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'See how easy it is to request a service from PhilaHomes: request a quote, we deliver, you pay.',
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="section-heading">How It Works</h1>
      <p className="mt-3 text-lg text-gray-600">
        From request to completion — three simple steps.
      </p>
      <div className="mt-12">
        <StagesGuide />
      </div>
      <div className="mt-12 text-center">
        <Link href="/request-quote" className="btn-primary">
          Request a quote
        </Link>
      </div>
    </div>
  );
}
