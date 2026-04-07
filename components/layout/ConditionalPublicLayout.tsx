'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SupportChatbot } from '@/components/chat/SupportChatbot';

export function ConditionalPublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  const isHome = pathname === '/';

  return (
    <>
      <Header />
      <main className={`flex-1 ${isHome ? '' : 'pt-24'}`}>{children}</main>
      <Footer />
      <SupportChatbot />
    </>
  );
}
