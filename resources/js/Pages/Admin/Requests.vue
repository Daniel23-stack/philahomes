<script setup>
import { Head, router, usePage } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDate, formatSlug, requestStatuses, statusLabel } from '@/utils/admin';

defineProps({ requests: Array });

const page = usePage();
const flash = () => page.props.flash?.status;

function updateStatus(id, status) {
  router.patch(`/admin/requests/${id}`, { status }, { preserveScroll: true });
}
</script>

<template>
  <Head title="Service requests" />
  <AdminLayout title="Service requests" subtitle="Review incoming quote requests and update their status.">
    <p v-if="flash()" class="admin-flash">{{ flash() }}</p>

    <AdminCard title="All requests" outline flush>
      <div v-if="requests?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Contact</th>
              <th>Service</th>
              <th>Description</th>
              <th>Status</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in requests" :key="r.id" class="admin-table__row">
              <td>
                <strong>{{ r.contact_name }}</strong><br>
                <small class="text-muted">{{ r.contact_email }}</small>
                <small v-if="r.contact_phone" class="d-block text-muted">{{ r.contact_phone }}</small>
              </td>
              <td>
                <span class="text-capitalize">{{ formatSlug(r.service_category) }}</span>
                <small v-if="r.sub_service" class="d-block text-muted">{{ r.sub_service }}</small>
              </td>
              <td style="max-width: 16rem">{{ r.description }}</td>
              <td>
                <select
                  class="form-control-sm"
                  :value="r.status"
                  @change="updateStatus(r.id, $event.target.value)"
                >
                  <option v-for="s in requestStatuses" :key="s" :value="s">{{ statusLabel(s) }}</option>
                </select>
              </td>
              <td>{{ formatDate(r.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No requests yet. New quote submissions from the website will appear here.</p>
      </div>
    </AdminCard>
  </AdminLayout>
</template>
