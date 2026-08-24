<script setup>
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDateTime } from '@/utils/admin';

defineProps({ subscribers: Array });
</script>

<template>
  <Head title="Newsletter" />
  <AdminLayout title="Newsletter" subtitle="Email subscribers from the website signup form.">
    <AdminCard title="Subscribers" outline flush>
      <div v-if="subscribers?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Subscribed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in subscribers" :key="s.id" class="admin-table__row">
              <td><strong>{{ s.email }}</strong></td>
              <td>{{ formatDateTime(s.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No subscribers yet.</p>
      </div>
    </AdminCard>
  </AdminLayout>
</template>
