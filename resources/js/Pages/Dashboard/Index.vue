<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import ClientLayout from '@/Layouts/ClientLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import AdminSmallBox from '@/Components/Admin/AdminSmallBox.vue';
import { formatDate, formatSlug, statusClass, statusLabel } from '@/utils/admin';

const props = defineProps({ stats: Object, requests: Array });

const statCards = computed(() => [
  { key: 'requests', label: 'Total requests', href: '/dashboard/requests', icon: 'fa-clipboard-list', color: 'info' },
  { key: 'pending', label: 'Pending review', href: '/dashboard/requests', icon: 'fa-clock', color: 'warning' },
  { key: 'active_jobs', label: 'Active jobs', href: '/dashboard/jobs', icon: 'fa-tools', color: 'success' },
  { key: 'quotes', label: 'Quotes to review', href: '/dashboard/quotes', icon: 'fa-file-invoice', color: 'primary' },
  { key: 'invoices', label: 'Unpaid invoices', href: '/dashboard/invoices', icon: 'fa-file-invoice-dollar', color: 'danger' },
  { key: 'messages', label: 'Conversations', href: '/dashboard/messages', icon: 'fa-comments', color: 'teal' },
]);

const pipeline = [
  { key: 'pending', label: 'Requested' },
  { key: 'reviewing', label: 'Reviewing' },
  { key: 'quoted', label: 'Quoted' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'completed', label: 'Completed' },
];
</script>

<template>
  <Head title="Dashboard" />
  <ClientLayout title="Dashboard" subtitle="Track your service requests, quotes, jobs, and invoices.">
    <div class="lte-row mb-4">
      <div v-for="card in statCards" :key="card.key" class="lte-col-3">
        <AdminSmallBox
          :label="card.label"
          :value="stats?.[card.key] ?? 0"
          :href="card.href"
          :icon="card.icon"
          :color="card.color"
        />
      </div>
    </div>

    <AdminCard title="Service pipeline" outline class="mb-4">
      <div class="d-flex flex-wrap gap-2" style="display: flex; flex-wrap: wrap; gap: 0.5rem">
        <div
          v-for="step in pipeline"
          :key="step.key"
          class="pipeline-step"
          :class="{
            'pipeline-step--active': requests?.some((r) => r.status === step.key),
            'pipeline-step--done': step.key === 'completed' && requests?.some((r) => r.status === 'completed'),
          }"
        >
          {{ step.label }}
        </div>
      </div>
      <p class="text-muted mb-0" style="margin-top: 1rem; font-size: 0.875rem">
        Your requests move through each stage as our team processes them.
      </p>
    </AdminCard>

    <AdminCard title="Recent requests" outline flush>
      <template #tools>
        <Link href="/#quote" class="btn-lte btn-lte-primary">
          <i class="fas fa-plus" /> New request
        </Link>
      </template>

      <div v-if="requests?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Description</th>
              <th>Status</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in requests" :key="r.id" class="admin-table__row">
              <td class="text-capitalize">{{ formatSlug(r.service_category) }}</td>
              <td style="max-width: 16rem">{{ r.description }}</td>
              <td><span :class="statusClass(r.status)">{{ statusLabel(r.status) }}</span></td>
              <td>{{ formatDate(r.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No requests yet.</p>
        <Link href="/#quote" class="btn-lte btn-lte-primary" style="margin-top: 1rem">Request a quote</Link>
      </div>
    </AdminCard>
  </ClientLayout>
</template>
