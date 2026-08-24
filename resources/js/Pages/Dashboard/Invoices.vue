<script setup>
import { Head } from '@inertiajs/vue3';
import ClientLayout from '@/Layouts/ClientLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDate, formatMoney, statusClass, statusLabel } from '@/utils/admin';

defineProps({ invoices: Array });
</script>

<template>
  <Head title="Invoices" />
  <ClientLayout title="Invoices" subtitle="View payment status and due dates.">
    <AdminCard title="Your invoices" outline flush>
      <div v-if="invoices?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Due date</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in invoices" :key="inv.id" class="admin-table__row">
              <td><strong>#{{ inv.id }}</strong></td>
              <td>{{ formatMoney(inv.amount) }}</td>
              <td><span :class="statusClass(inv.status)">{{ statusLabel(inv.status) }}</span></td>
              <td>{{ formatDate(inv.due_date) }}</td>
              <td>{{ formatDate(inv.paid_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No invoices yet.</p>
      </div>
    </AdminCard>
  </ClientLayout>
</template>
