import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { AdminMobileNavProvider } from '@/components/admin/AdminMobileNavContext';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string })?.role !== 'admin') {
    redirect('/login?callbackUrl=/admin');
  }

  return (
    <AdminMobileNavProvider>
      <div className="min-h-screen bg-slate-50">
        <AdminSidebar />
        <div className="lg:pl-64">
          <AdminNavbar />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminMobileNavProvider>
  );
}
