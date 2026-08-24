export function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(value) {
  if (!value) return '—';
  return new Date(value).toLocaleString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatMoney(value) {
  if (value == null || value === '') return '—';
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export function formatSlug(slug) {
  return slug?.replace(/-/g, ' ') ?? '—';
}

export function statusLabel(status) {
  return status?.replace(/_/g, ' ') ?? 'unknown';
}

const BADGE_MAP = {
  pending: 'admin-badge admin-badge--pending',
  new: 'admin-badge admin-badge--pending',
  draft: 'admin-badge admin-badge--pending',
  reviewing: 'admin-badge admin-badge--pending',
  sent: 'admin-badge admin-badge--quoted',
  quoted: 'admin-badge admin-badge--quoted',
  scheduled: 'admin-badge admin-badge--quoted',
  in_progress: 'admin-badge admin-badge--progress',
  accepted: 'admin-badge admin-badge--progress',
  read: 'admin-badge admin-badge--progress',
  replied: 'admin-badge admin-badge--done',
  completed: 'admin-badge admin-badge--done',
  paid: 'admin-badge admin-badge--done',
  done: 'admin-badge admin-badge--done',
  cancelled: 'admin-badge admin-badge--cancelled',
  rejected: 'admin-badge admin-badge--cancelled',
  archived: 'admin-badge admin-badge--cancelled',
  overdue: 'admin-badge admin-badge--cancelled',
};

export function statusClass(status) {
  return BADGE_MAP[status] ?? 'admin-badge';
}

export const requestStatuses = ['pending', 'reviewing', 'quoted', 'in_progress', 'completed', 'cancelled'];
export const quoteStatuses = ['draft', 'sent', 'accepted', 'rejected'];
export const jobStatuses = ['scheduled', 'in_progress', 'completed', 'cancelled'];
export const invoiceStatuses = ['draft', 'sent', 'paid', 'overdue', 'cancelled'];
export const contactStatuses = ['new', 'read', 'replied', 'archived'];
