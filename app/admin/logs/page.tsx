import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { ScrollText } from 'lucide-react';

export default function AdminLogsPage() {
  return (
    <div>
      <AdminPageHeader
        title="Activity logs"
        description="Filter by user, action, or date."
      />
      <AdminEmptyState
        icon={ScrollText}
        title="No logs yet"
        description="User and system activity will be recorded here."
      />
    </div>
  );
}
