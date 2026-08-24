<script setup>
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDate, statusClass, statusLabel } from '@/utils/admin';

defineProps({ users: Array });
</script>

<template>
  <Head title="Users" />
  <AdminLayout title="Users" subtitle="Registered clients and admin accounts.">
    <AdminCard title="All users" outline flush>
      <div v-if="users?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Requests</th>
              <th>Invoices</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u.id" class="admin-table__row">
              <td><strong>{{ u.name || '—' }}</strong></td>
              <td>{{ u.email }}</td>
              <td><span :class="statusClass(u.role)">{{ statusLabel(u.role) }}</span></td>
              <td>{{ u.service_requests_count ?? 0 }}</td>
              <td>{{ u.invoices_count ?? 0 }}</td>
              <td>{{ formatDate(u.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No users found.</p>
      </div>
    </AdminCard>
  </AdminLayout>
</template>
