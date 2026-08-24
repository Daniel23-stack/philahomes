<script setup>
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDateTime } from '@/utils/admin';

defineProps({ logs: Array });
</script>

<template>
  <Head title="Activity logs" />
  <AdminLayout title="Activity logs" subtitle="Recent admin actions across the system.">
    <AdminCard title="Audit trail" outline flush>
      <div v-if="logs?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>When</th>
              <th>User</th>
              <th>Action</th>
              <th>Entity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in logs" :key="log.id" class="admin-table__row">
              <td>{{ formatDateTime(log.created_at) }}</td>
              <td>
                <strong>{{ log.user?.name ?? 'System' }}</strong><br>
                <small class="text-muted">{{ log.user?.email }}</small>
              </td>
              <td class="text-capitalize">{{ log.action.replace(/_/g, ' ') }}</td>
              <td>
                <span v-if="log.entity_type">{{ log.entity_type }} #{{ log.entity_id }}</span>
                <span v-else>—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No activity logged yet.</p>
      </div>
    </AdminCard>
  </AdminLayout>
</template>
