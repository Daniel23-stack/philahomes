<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import ClientLayout from '@/Layouts/ClientLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDateTime, formatSlug } from '@/utils/admin';

const props = defineProps({ conversations: Array, requests: Array });
const page = usePage();
const flash = () => page.props.flash?.status;

const composeForm = useForm({
  body: '',
  request_id: props.requests?.[0]?.id ?? '',
});

function sendMessage() {
  composeForm.post('/dashboard/messages', {
    preserveScroll: true,
    onSuccess: () => composeForm.reset('body'),
  });
}
</script>

<template>
  <Head title="Messages" />
  <ClientLayout title="Messages" subtitle="Chat directly with the Okuhle Homes team.">
    <p v-if="flash()" class="admin-flash">{{ flash() }}</p>

    <AdminCard title="New message" outline class="mb-4">
      <form class="admin-form" @submit.prevent="sendMessage">
        <div class="admin-form__grid">
          <div class="admin-field" style="grid-column: 1 / -1">
            <label>Link to request (optional)</label>
            <select v-model="composeForm.request_id" class="form-control">
              <option value="">General enquiry</option>
              <option v-for="r in requests" :key="r.id" :value="r.id">
                #{{ r.id }} — {{ formatSlug(r.service_category) }}
              </option>
            </select>
          </div>
          <div class="admin-field" style="grid-column: 1 / -1">
            <label>Message</label>
            <textarea v-model="composeForm.body" class="form-control" rows="3" required placeholder="How can we help?" />
          </div>
        </div>
        <button type="submit" class="btn-lte btn-lte-primary" :disabled="composeForm.processing">Send message</button>
      </form>
    </AdminCard>

    <AdminCard title="Conversations" outline flush>
      <div v-if="conversations?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Last message</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in conversations" :key="c.id" class="admin-table__row">
              <td style="max-width: 24rem">
                {{ c.last_message || 'No messages' }}
                <small v-if="c.last_sender" class="d-block text-capitalize text-muted">{{ c.last_sender }}</small>
              </td>
              <td>{{ formatDateTime(c.updated_at) }}</td>
              <td>
                <Link :href="`/dashboard/messages/${c.id}`" class="btn-lte btn-lte-primary">Open</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No conversations yet. Send a message above to get started.</p>
      </div>
    </AdminCard>
  </ClientLayout>
</template>
