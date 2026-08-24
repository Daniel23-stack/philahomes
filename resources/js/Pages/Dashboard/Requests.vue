<script setup>
import { Head, Link } from '@inertiajs/vue3';
import ClientLayout from '@/Layouts/ClientLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDate, formatSlug, statusClass, statusLabel } from '@/utils/admin';

defineProps({ requests: Array });
</script>

<template>
  <Head title="My requests" />
  <ClientLayout title="My requests" subtitle="All service requests you have submitted.">
    <AdminCard title="Request history" outline flush>
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
              <th>Sub-service</th>
              <th>Description</th>
              <th>Status</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in requests" :key="r.id" class="admin-table__row">
              <td class="text-capitalize"><strong>{{ formatSlug(r.service_category) }}</strong></td>
              <td>{{ r.sub_service || '—' }}</td>
              <td style="max-width: 18rem">{{ r.description }}</td>
              <td><span :class="statusClass(r.status)">{{ statusLabel(r.status) }}</span></td>
              <td>{{ formatDate(r.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>You haven't submitted any requests yet.</p>
        <Link href="/#quote" class="btn-lte btn-lte-primary" style="margin-top: 1rem">Request a quote</Link>
      </div>
    </AdminCard>
  </ClientLayout>
</template>
