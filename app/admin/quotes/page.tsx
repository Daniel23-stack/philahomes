import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { MessageSquare } from 'lucide-react';

export default function AdminQuotesPage() {
  return (
    <div>
      <AdminPageHeader
        title="Quotes"
        description="Create and manage quotes from service requests."
      />
      <AdminEmptyState
        icon={MessageSquare}
        title="No quotes yet"
        description="Create a quote from a service request to get started."
      />
    </div>
  );
}
