<script setup>
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDate, invoiceStatuses, statusLabel } from '@/utils/admin';

const props = defineProps({ invoices: Array, clients: Array, jobs: Array });
const page = usePage();
const flash = () => page.props.flash?.status;

const createForm = useForm({
  user_id: props.clients?.[0]?.id ?? '',
  job_id: '',
  amount: '',
  status: 'draft',
  due_date: '',
});

function submitInvoice() {
  createForm.post('/admin/invoices', {
    preserveScroll: true,
    onSuccess: () => createForm.reset('amount', 'due_date', 'job_id'),
  });
}

function updateInvoice(invoice, field, value) {
  router.patch(
    `/admin/invoices/${invoice.id}`,
    { amount: invoice.amount, status: invoice.status, due_date: invoice.due_date?.slice(0, 10) ?? '', [field]: value },
    { preserveScroll: true },
  );
}
</script>

<template>
  <Head title="Invoices" />
  <AdminLayout title="Invoices" subtitle="Create invoices and mark payments received.">
    <p v-if="flash()" class="admin-flash">{{ flash() }}</p>

    <AdminCard title="New invoice" outline class="mb-4">
      <form class="admin-form" @submit.prevent="submitInvoice">
        <div class="admin-form__grid">
          <div class="admin-field">
            <label>Client</label>
            <select v-model="createForm.user_id" class="form-control" required>
              <option v-for="c in clients" :key="c.id" :value="c.id">{{ c.name }} ({{ c.email }})</option>
            </select>
          </div>
          <div class="admin-field">
            <label>Linked job (optional)</label>
            <select v-model="createForm.job_id" class="form-control">
              <option value="">None</option>
              <option v-for="j in jobs" :key="j.id" :value="j.id">#{{ j.id }} — {{ j.request?.contact_name }}</option>
            </select>
          </div>
          <div class="admin-field">
            <label>Amount (ZAR)</label>
            <input v-model="createForm.amount" type="number" class="form-control" min="0" step="0.01" required>
          </div>
          <div class="admin-field">
            <label>Due date</label>
            <input v-model="createForm.due_date" type="date" class="form-control">
          </div>
          <div class="admin-field">
            <label>Status</label>
            <select v-model="createForm.status" class="form-control">
              <option v-for="s in invoiceStatuses" :key="s" :value="s">{{ statusLabel(s) }}</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn-lte btn-lte-primary" :disabled="createForm.processing">Create invoice</button>
      </form>
    </AdminCard>

    <AdminCard title="All invoices" outline flush>
      <div v-if="invoices?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Due</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in invoices" :key="inv.id" class="admin-table__row">
              <td>
                <strong>{{ inv.user?.name ?? '—' }}</strong><br>
                <small class="text-muted">{{ inv.user?.email }}</small>
              </td>
              <td>
                <input
                  type="number"
                  class="form-control-sm"
                  :value="inv.amount"
                  @change="updateInvoice(inv, 'amount', $event.target.value)"
                >
              </td>
              <td>
                <select
                  class="form-control-sm"
                  :value="inv.status"
                  @change="updateInvoice(inv, 'status', $event.target.value)"
                >
                  <option v-for="s in invoiceStatuses" :key="s" :value="s">{{ statusLabel(s) }}</option>
                </select>
              </td>
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
  </AdminLayout>
</template>
