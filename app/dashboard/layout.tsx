import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login?callbackUrl=/dashboard');

  const links = [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/catalog', label: 'Catalog' },
    { href: '/dashboard/messages', label: 'Messages' },
    { href: '/dashboard/invoices', label: 'Invoices' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-8 flex flex-wrap gap-4 border-b border-gray-200 pb-4">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-gray-600 hover:text-[var(--color-primary)]"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
