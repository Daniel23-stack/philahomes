<script setup>
import { Head, router, usePage } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { contactStatuses, formatDateTime, statusLabel } from '@/utils/admin';

defineProps({ messages: Array });
const page = usePage();
const flash = () => page.props.flash?.status;

function updateStatus(id, status) {
  router.patch(`/admin/contacts/${id}`, { status }, { preserveScroll: true });
}
</script>

<template>
  <Head title="Contact inbox" />
  <AdminLayout title="Contact inbox" subtitle="Messages submitted via the contact form.">
    <p v-if="flash()" class="admin-flash">{{ flash() }}</p>

    <AdminCard title="Messages" outline flush>
      <div v-if="messages?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>From</th>
              <th>Contact</th>
              <th>Message</th>
              <th>Status</th>
              <th>Received</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in messages" :key="m.id" class="admin-table__row">
              <td><strong>{{ m.name }}</strong></td>
              <td>{{ m.contact }}</td>
              <td style="max-width: 20rem">{{ m.query }}</td>
              <td>
                <select
                  class="form-control-sm"
                  :value="m.status"
                  @change="updateStatus(m.id, $event.target.value)"
                >
                  <option v-for="s in contactStatuses" :key="s" :value="s">{{ statusLabel(s) }}</option>
                </select>
              </td>
              <td>{{ formatDateTime(m.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No contact messages yet.</p>
      </div>
    </AdminCard>
  </AdminLayout>
</template>
