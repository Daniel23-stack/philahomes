import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { Inbox } from 'lucide-react';

export default function AdminMessagesPage() {
  return (
    <div>
      <AdminPageHeader
        title="Messages"
        description="Reply to customer conversations."
      />
      <AdminEmptyState
        icon={Inbox}
        title="No conversations yet"
        description="Customer messages will appear here."
      />
    </div>
  );
}
