<script setup>
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import AdminSmallBox from '@/Components/Admin/AdminSmallBox.vue';
import { formatDateTime, formatMoney, formatSlug, statusLabel } from '@/utils/admin';

defineProps({
  summary: Object,
  requestsByCategory: Array,
  requestsByStatus: Array,
  recentSignups: Array,
});

const summaryMeta = {
  totalUsers: { label: 'Client users', icon: 'fa-users', color: 'info' },
  activeJobs: { label: 'Active jobs', icon: 'fa-tools', color: 'success' },
  pendingRequests: { label: 'Pending requests', icon: 'fa-inbox', color: 'warning' },
  revenuePaid: { label: 'Revenue paid', icon: 'fa-dollar-sign', color: 'primary' },
  revenuePending: { label: 'Revenue pending', icon: 'fa-clock', color: 'danger' },
};
</script>

<template>
  <Head title="Analytics" />
  <AdminLayout title="Analytics" subtitle="Overview of pipeline, revenue, and signups.">
    <div class="lte-row mb-4">
      <div v-for="(meta, key) in summaryMeta" :key="key" class="lte-col-3">
        <AdminSmallBox
          :label="meta.label"
          :value="String(key).includes('revenue') ? formatMoney(summary?.[key]) : (summary?.[key] ?? 0)"
          :icon="meta.icon"
          :color="meta.color"
        />
      </div>
    </div>

    <div class="lte-row">
      <div class="lte-col-6 mb-4">
        <AdminCard title="Requests by category" outline>
          <ul style="list-style: none; margin: 0; padding: 0">
            <li
              v-for="row in requestsByCategory"
              :key="row.service_category"
              style="display: flex; justify-content: space-between; padding: 0.35rem 0"
            >
              <span class="text-capitalize">{{ formatSlug(row.service_category) }}</span>
              <strong>{{ row.total }}</strong>
            </li>
          </ul>
        </AdminCard>
      </div>

      <div class="lte-col-6 mb-4">
        <AdminCard title="Requests by status" outline>
          <ul style="list-style: none; margin: 0; padding: 0">
            <li
              v-for="row in requestsByStatus"
              :key="row.status"
              style="display: flex; justify-content: space-between; padding: 0.35rem 0"
              class="text-capitalize"
            >
              <span>{{ statusLabel(row.status) }}</span>
              <strong>{{ row.total }}</strong>
            </li>
          </ul>
        </AdminCard>
      </div>
    </div>

    <AdminCard title="Recent signups" outline flush>
      <div v-if="recentSignups?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in recentSignups" :key="u.id" class="admin-table__row">
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
              <td>{{ formatDateTime(u.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No recent client signups.</p>
      </div>
    </AdminCard>
  </AdminLayout>
</template>
