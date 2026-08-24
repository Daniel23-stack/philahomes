<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDateTime } from '@/utils/admin';

defineProps({ conversations: Array });
</script>

<template>
  <Head title="Messages" />
  <AdminLayout title="Client messages" subtitle="Conversations with registered clients.">
    <AdminCard title="Inbox" outline flush>
      <div v-if="conversations?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Last message</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in conversations" :key="c.id" class="admin-table__row">
              <td>
                <strong>{{ c.user?.name ?? 'Unknown' }}</strong><br>
                <small class="text-muted">{{ c.user?.email }}</small>
              </td>
              <td style="max-width: 20rem">
                {{ c.last_message || 'No messages yet' }}
                <small v-if="c.last_sender" class="d-block text-capitalize text-muted">{{ c.last_sender }}</small>
              </td>
              <td>{{ formatDateTime(c.updated_at) }}</td>
              <td>
                <Link :href="`/admin/messages/${c.id}`" class="btn-lte btn-lte-primary">Open</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No conversations yet.</p>
      </div>
    </AdminCard>
  </AdminLayout>
</template>
