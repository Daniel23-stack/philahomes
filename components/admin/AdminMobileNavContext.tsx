'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type AdminMobileNavContextValue = {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  toggleMobile: () => void;
};

const AdminMobileNavContext = createContext<AdminMobileNavContextValue | null>(null);

export function AdminMobileNavProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);
  const value = useMemo(
    () => ({ mobileOpen, setMobileOpen, toggleMobile }),
    [mobileOpen, toggleMobile]
  );
  return <AdminMobileNavContext.Provider value={value}>{children}</AdminMobileNavContext.Provider>;
}

export function useAdminMobileNav() {
  const ctx = useContext(AdminMobileNavContext);
  if (!ctx) {
    throw new Error('useAdminMobileNav must be used within AdminMobileNavProvider');
  }
  return ctx;
}
