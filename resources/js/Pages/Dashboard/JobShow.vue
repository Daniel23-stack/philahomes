<script setup>
import { Head, Link } from '@inertiajs/vue3';
import ClientLayout from '@/Layouts/ClientLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDate, formatMoney, formatSlug, statusClass, statusLabel } from '@/utils/admin';

defineProps({ job: Object });
</script>

<template>
  <Head title="Job details" />
  <ClientLayout title="Job details" subtitle="Status and schedule for your service job.">
    <Link href="/dashboard/jobs" class="btn-lte btn-lte-secondary mb-3">
      <i class="fas fa-arrow-left" /> Back to jobs
    </Link>

    <AdminCard title="Job summary" outline class="mb-4">
      <dl style="display: grid; grid-template-columns: 8rem 1fr; gap: 0.5rem 1rem; margin: 0">
        <dt class="text-muted">Service</dt>
        <dd class="text-capitalize" style="margin: 0">{{ formatSlug(job.request?.service_category) }}</dd>
        <dt class="text-muted">Status</dt>
        <dd style="margin: 0"><span :class="statusClass(job.status)">{{ statusLabel(job.status) }}</span></dd>
        <dt class="text-muted">Scheduled</dt>
        <dd style="margin: 0">{{ formatDate(job.scheduled_date) }}</dd>
        <dt class="text-muted">Completed</dt>
        <dd style="margin: 0">{{ formatDate(job.completed_at) }}</dd>
        <dt class="text-muted">Quote amount</dt>
        <dd style="margin: 0">{{ formatMoney(job.quote?.amount) }}</dd>
        <dt class="text-muted">Notes</dt>
        <dd style="margin: 0; white-space: pre-wrap">{{ job.notes || '—' }}</dd>
      </dl>
    </AdminCard>

    <AdminCard title="Request details" outline>
      <p>{{ job.request?.description }}</p>
    </AdminCard>
  </ClientLayout>
</template>
