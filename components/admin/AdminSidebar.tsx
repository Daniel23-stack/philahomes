'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Briefcase,
  Package,
  Inbox,
  Receipt,
  BarChart3,
  ScrollText,
  FileEdit,
  LogOut,
  Home,
  Users,
} from 'lucide-react';
import { useAdminMobileNav } from '@/components/admin/AdminMobileNavContext';

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/requests', label: 'Requests', icon: FileText },
  { href: '/admin/quotes', label: 'Quotes', icon: MessageSquare },
  { href: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/catalog', label: 'Catalog', icon: Package },
  { href: '/admin/messages', label: 'Messages', icon: Inbox },
  { href: '/admin/invoices', label: 'Invoices', icon: Receipt },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/logs', label: 'Logs', icon: ScrollText },
  { href: '/admin/blog', label: 'Blog', icon: FileEdit },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { mobileOpen, setMobileOpen } = useAdminMobileNav();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-700/50 bg-slate-900 transition-transform duration-200 ease-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
      <div className="flex h-16 items-center gap-2 border-b border-slate-700/50 px-6">
        <span className="text-lg font-bold text-white">
          Phila<span className="text-orange-400">Homes</span>
        </span>
        <span className="rounded bg-slate-700 px-2 py-0.5 text-xs font-medium text-slate-300">
          Admin
        </span>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-700/50 p-3">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <Home className="h-5 w-5 shrink-0" />
          View site
        </Link>
        <Link
          href="/api/auth/signout"
          className="mt-0.5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-red-400"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          Sign out
        </Link>
      </div>
    </aside>
    </>
  );
}
