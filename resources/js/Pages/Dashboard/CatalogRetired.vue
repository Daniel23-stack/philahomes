<script setup>
import { Head, Link } from '@inertiajs/vue3';
import ClientLayout from '@/Layouts/ClientLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatMoney, formatSlug } from '@/utils/admin';

defineProps({ items: Array });
</script>

<template>
  <Head title="Retired services" />
  <ClientLayout title="Retired services" subtitle="Archive of services no longer offered.">
    <AdminCard title="Retired catalog items" outline flush>
      <template #tools>
        <Link href="/dashboard/catalog" class="btn-lte btn-lte-secondary">Back to catalog</Link>
      </template>

      <div v-if="items?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Service</th>
              <th>Description</th>
              <th>Last price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id" class="admin-table__row">
              <td class="text-capitalize">{{ formatSlug(item.service_category) }}</td>
              <td><strong>{{ item.name }}</strong></td>
              <td>{{ item.description || '—' }}</td>
              <td>{{ formatMoney(item.base_price) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No retired services in the archive.</p>
      </div>
    </AdminCard>
  </ClientLayout>
</template>
