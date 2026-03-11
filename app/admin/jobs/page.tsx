import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { Briefcase } from 'lucide-react';

export default function AdminJobsPage() {
  return (
    <div>
      <AdminPageHeader
        title="Jobs"
        description="Track and update job status and scheduling."
      />
      <AdminEmptyState
        icon={Briefcase}
        title="No jobs yet"
        description="Jobs are created when a quote is accepted."
      />
    </div>
  );
}
