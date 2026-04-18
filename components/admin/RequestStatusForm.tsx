'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateServiceRequestStatus } from '@/app/admin/requests/actions';

const STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
];

type Props = {
  requestId: string;
  currentStatus: string;
};

export function RequestStatusForm({ requestId, currentStatus }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === currentStatus) return;
    setSaving(true);
    setMessage(null);
    const res = await updateServiceRequestStatus(requestId, status);
    setSaving(false);
    if (res.ok) {
      setMessage('Saved');
      router.refresh();
    } else {
      setMessage(res.error ?? 'Could not update');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap items-end gap-3">
      <div>
        <label htmlFor="req-status" className="block text-sm font-medium text-slate-700">
          Status
        </label>
        <select
          id="req-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={saving || status === currentStatus}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Update status'}
      </button>
      {message && <p className="text-sm text-slate-600">{message}</p>}
    </form>
  );
}
