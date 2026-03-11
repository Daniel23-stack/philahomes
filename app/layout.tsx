import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { ConditionalPublicLayout } from '@/components/layout/ConditionalPublicLayout';

export const metadata: Metadata = {
  title: {
    default: 'PhilaHomes | Plumbing, Electrical, Renovations & Solar',
    template: '%s | PhilaHomes',
  },
  description:
    'Your one-stop solution for home maintenance and renovation. Affordable plumbing, electrical, renovations, and solar PV in Johannesburg and beyond.',
  keywords: [
    'affordable plumbing Johannesburg',
    'electrical services',
    'home renovations',
    'solar PV installation',
    'PhilaHomes',
  ],
  openGraph: {
    title: 'PhilaHomes | Plumbing, Electrical, Renovations & Solar',
    description: 'Your one-stop solution for home maintenance and renovation.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <ConditionalPublicLayout>{children}</ConditionalPublicLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
