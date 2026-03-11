'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Search, Bell, User, Settings, LogOut, Home, ChevronDown } from 'lucide-react';

export function AdminNavbar() {
  const { data: session } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const name = session?.user?.name || session?.user?.email?.split('@')[0] || 'Admin';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 shadow-sm">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search (Ctrl+/)"
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm placeholder-slate-400 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">View site</span>
        </Link>

        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => { setNotifOpen((o) => !o); setUserOpen(false); }}
            className="relative rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-orange-500" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-semibold text-slate-800">Notifications</p>
              </div>
              <div className="max-h-72 overflow-y-auto">
                <div className="px-4 py-6 text-center text-sm text-slate-500">No new notifications</div>
              </div>
              <Link
                href="#"
                className="block border-t border-slate-100 px-4 py-2.5 text-center text-sm font-medium text-slate-600 hover:bg-slate-50"
                onClick={() => setNotifOpen(false)}
              >
                View all
              </Link>
            </div>
          )}
        </div>

        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => { setUserOpen((o) => !o); setNotifOpen(false); }}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-slate-700 hover:bg-slate-100"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
              {name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden max-w-[120px] truncate text-left text-sm font-medium sm:block">{name}</span>
            <ChevronDown className={`h-4 w-4 text-slate-500 transition ${userOpen ? 'rotate-180' : ''}`} />
          </button>
          {userOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-semibold text-slate-800">{name}</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                onClick={() => setUserOpen(false)}
              >
                <User className="h-4 w-4" />
                My Profile
              </Link>
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                onClick={() => setUserOpen(false)}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <div className="border-t border-slate-100 pt-1">
                <Link
                  href="/api/auth/signout"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => setUserOpen(false)}
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
