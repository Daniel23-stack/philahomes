<script setup>
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDate, formatSlug, quoteStatuses, statusLabel } from '@/utils/admin';

const props = defineProps({ quotes: Array, requests: Array });
const page = usePage();
const flash = () => page.props.flash?.status;

const createForm = useForm({
  request_id: props.requests?.[0]?.id ?? '',
  amount: '',
  notes: '',
  status: 'draft',
});

function submitQuote() {
  createForm.post('/admin/quotes', { preserveScroll: true, onSuccess: () => createForm.reset('amount', 'notes') });
}

function updateQuote(quote, field, value) {
  router.patch(
    `/admin/quotes/${quote.id}`,
    { amount: quote.amount, notes: quote.notes, status: quote.status, [field]: value },
    { preserveScroll: true },
  );
}
</script>

<template>
  <Head title="Quotes" />
  <AdminLayout title="Quotes" subtitle="Create and manage quotes for service requests.">
    <p v-if="flash()" class="admin-flash">{{ flash() }}</p>

    <AdminCard title="New quote" outline class="mb-4">
      <form class="admin-form" @submit.prevent="submitQuote">
        <div class="admin-form__grid">
          <div class="admin-field">
            <label>Service request</label>
            <select v-model="createForm.request_id" class="form-control" required>
              <option v-for="r in requests" :key="r.id" :value="r.id">
                #{{ r.id }} — {{ r.contact_name }} ({{ formatSlug(r.service_category) }})
              </option>
            </select>
          </div>
          <div class="admin-field">
            <label>Amount (ZAR)</label>
            <input v-model="createForm.amount" type="number" class="form-control" min="0" step="0.01">
          </div>
          <div class="admin-field">
            <label>Status</label>
            <select v-model="createForm.status" class="form-control">
              <option v-for="s in quoteStatuses" :key="s" :value="s">{{ statusLabel(s) }}</option>
            </select>
          </div>
          <div class="admin-field" style="grid-column: 1 / -1">
            <label>Notes</label>
            <textarea v-model="createForm.notes" class="form-control" rows="3" />
          </div>
        </div>
        <button type="submit" class="btn-lte btn-lte-primary" :disabled="createForm.processing">Create quote</button>
      </form>
    </AdminCard>

    <AdminCard title="All quotes" outline flush>
      <div v-if="quotes?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Request</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="q in quotes" :key="q.id" class="admin-table__row">
              <td>
                <strong>{{ q.request?.contact_name ?? '—' }}</strong><br>
                <small class="text-capitalize text-muted">{{ formatSlug(q.request?.service_category) }}</small>
              </td>
              <td>
                <input
                  type="number"
                  class="form-control-sm"
                  :value="q.amount"
                  @change="updateQuote(q, 'amount', $event.target.value)"
                >
              </td>
              <td>
                <select
                  class="form-control-sm"
                  :value="q.status"
                  @change="updateQuote(q, 'status', $event.target.value)"
                >
                  <option v-for="s in quoteStatuses" :key="s" :value="s">{{ statusLabel(s) }}</option>
                </select>
              </td>
              <td>{{ q.notes || '—' }}</td>
              <td>{{ formatDate(q.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No quotes yet. Create one from a service request above.</p>
      </div>
    </AdminCard>
  </AdminLayout>
</template>
