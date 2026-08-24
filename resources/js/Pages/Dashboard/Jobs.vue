<script setup>
import { Head, Link } from '@inertiajs/vue3';
import ClientLayout from '@/Layouts/ClientLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDate, formatMoney, formatSlug, statusClass, statusLabel } from '@/utils/admin';

defineProps({ jobs: Array });
</script>

<template>
  <Head title="Jobs" />
  <ClientLayout title="Jobs" subtitle="Track scheduled and completed work.">
    <AdminCard title="Your jobs" outline flush>
      <div v-if="jobs?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Quote</th>
              <th>Status</th>
              <th>Scheduled</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="j in jobs" :key="j.id" class="admin-table__row">
              <td class="text-capitalize"><strong>{{ formatSlug(j.request?.service_category) }}</strong></td>
              <td>{{ formatMoney(j.quote?.amount) }}</td>
              <td><span :class="statusClass(j.status)">{{ statusLabel(j.status) }}</span></td>
              <td>{{ formatDate(j.scheduled_date) }}</td>
              <td>
                <Link :href="`/dashboard/jobs/${j.id}`" class="btn-lte btn-lte-primary">Details</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No jobs scheduled yet. Jobs appear after you accept a quote.</p>
      </div>
    </AdminCard>
  </ClientLayout>
</template>
