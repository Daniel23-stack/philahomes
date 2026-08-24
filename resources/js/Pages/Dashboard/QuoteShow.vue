<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import ClientLayout from '@/Layouts/ClientLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDate, formatMoney, formatSlug, statusClass, statusLabel } from '@/utils/admin';

const props = defineProps({ quote: Object });
const page = usePage();
const flash = () => page.props.flash?.status;

function respond(status) {
  if (!confirm(`Are you sure you want to ${status} this quote?`)) return;
  router.patch(`/dashboard/quotes/${props.quote.id}`, { status }, { preserveScroll: true });
}
</script>

<template>
  <Head title="Quote details" />
  <ClientLayout title="Quote details" subtitle="Review the quote and approve or decline.">
    <Link href="/dashboard/quotes" class="btn-lte btn-lte-secondary mb-3">
      <i class="fas fa-arrow-left" /> Back to quotes
    </Link>

    <p v-if="flash()" class="admin-flash">{{ flash() }}</p>

    <AdminCard title="Quote summary" outline class="mb-4">
      <dl style="display: grid; grid-template-columns: 8rem 1fr; gap: 0.5rem 1rem; margin: 0">
        <dt class="text-muted">Service</dt>
        <dd class="text-capitalize" style="margin: 0">{{ formatSlug(quote.request?.service_category) }}</dd>
        <dt class="text-muted">Amount</dt>
        <dd style="margin: 0; font-size: 1.25rem; font-weight: 700">{{ formatMoney(quote.amount) }}</dd>
        <dt class="text-muted">Status</dt>
        <dd style="margin: 0"><span :class="statusClass(quote.status)">{{ statusLabel(quote.status) }}</span></dd>
        <dt class="text-muted">Date</dt>
        <dd style="margin: 0">{{ formatDate(quote.created_at) }}</dd>
        <dt class="text-muted">Notes</dt>
        <dd style="margin: 0; white-space: pre-wrap">{{ quote.notes || '—' }}</dd>
      </dl>

      <div v-if="quote.status === 'sent'" class="admin-actions" style="margin-top: 1.5rem">
        <button type="button" class="btn-lte btn-lte-primary" @click="respond('accepted')">
          <i class="fas fa-check" /> Accept quote
        </button>
        <button type="button" class="btn-lte btn-lte-secondary" @click="respond('rejected')">
          <i class="fas fa-times" /> Decline
        </button>
      </div>
    </AdminCard>

    <AdminCard title="Related request" outline>
      <p class="text-capitalize"><strong>{{ formatSlug(quote.request?.service_category) }}</strong></p>
      <p style="margin-top: 0.5rem">{{ quote.request?.description }}</p>
    </AdminCard>
  </ClientLayout>
</template>
