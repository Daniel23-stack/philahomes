<script setup>
import { Head, Link } from '@inertiajs/vue3';
import ClientLayout from '@/Layouts/ClientLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDate, formatMoney, formatSlug, statusClass, statusLabel } from '@/utils/admin';

defineProps({ quotes: Array });
</script>

<template>
  <Head title="Quotes" />
  <ClientLayout title="Quotes" subtitle="Review quotes sent by our team.">
    <AdminCard title="Your quotes" outline flush>
      <div v-if="quotes?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Request</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="q in quotes" :key="q.id" class="admin-table__row">
              <td>
                <strong class="text-capitalize">{{ formatSlug(q.request?.service_category) }}</strong><br>
                <small class="text-muted">{{ q.request?.description }}</small>
              </td>
              <td>{{ formatMoney(q.amount) }}</td>
              <td><span :class="statusClass(q.status)">{{ statusLabel(q.status) }}</span></td>
              <td>{{ formatDate(q.created_at) }}</td>
              <td>
                <Link :href="`/dashboard/quotes/${q.id}`" class="btn-lte btn-lte-primary">View</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No quotes yet. They will appear here once our team prepares them.</p>
      </div>
    </AdminCard>
  </ClientLayout>
</template>
