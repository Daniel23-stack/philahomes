<script setup>
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatMoney, formatSlug, jobStatuses, statusLabel } from '@/utils/admin';

const props = defineProps({ jobs: Array, acceptedQuotes: Array });
const page = usePage();
const flash = () => page.props.flash?.status;

const createForm = useForm({
  quote_id: props.acceptedQuotes?.[0]?.id ?? '',
  scheduled_date: '',
  notes: '',
});

function scheduleJob() {
  createForm.post('/admin/jobs', { preserveScroll: true, onSuccess: () => createForm.reset('scheduled_date', 'notes') });
}

function updateJob(job, field, value) {
  router.patch(
    `/admin/jobs/${job.id}`,
    {
      status: job.status,
      scheduled_date: job.scheduled_date?.slice(0, 10) ?? '',
      notes: job.notes,
      [field]: value,
    },
    { preserveScroll: true },
  );
}
</script>

<template>
  <Head title="Jobs" />
  <AdminLayout title="Jobs" subtitle="Schedule and track work from accepted quotes.">
    <p v-if="flash()" class="admin-flash">{{ flash() }}</p>

    <AdminCard v-if="acceptedQuotes?.length" title="Schedule job" outline class="mb-4">
      <form class="admin-form" @submit.prevent="scheduleJob">
        <div class="admin-form__grid">
          <div class="admin-field">
            <label>Accepted quote</label>
            <select v-model="createForm.quote_id" class="form-control" required>
              <option v-for="q in acceptedQuotes" :key="q.id" :value="q.id">
                #{{ q.id }} — {{ q.request?.contact_name }} ({{ formatMoney(q.amount) }})
              </option>
            </select>
          </div>
          <div class="admin-field">
            <label>Scheduled date</label>
            <input v-model="createForm.scheduled_date" type="date" class="form-control">
          </div>
          <div class="admin-field" style="grid-column: 1 / -1">
            <label>Notes</label>
            <textarea v-model="createForm.notes" class="form-control" rows="2" />
          </div>
        </div>
        <button type="submit" class="btn-lte btn-lte-primary" :disabled="createForm.processing">Schedule job</button>
      </form>
    </AdminCard>

    <AdminCard title="All jobs" outline flush>
      <div v-if="jobs?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Service</th>
              <th>Quote</th>
              <th>Status</th>
              <th>Scheduled</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="j in jobs" :key="j.id" class="admin-table__row">
              <td><strong>{{ j.request?.contact_name ?? '—' }}</strong></td>
              <td class="text-capitalize">{{ formatSlug(j.request?.service_category) }}</td>
              <td>{{ formatMoney(j.quote?.amount) }}</td>
              <td>
                <select class="form-control-sm" :value="j.status" @change="updateJob(j, 'status', $event.target.value)">
                  <option v-for="s in jobStatuses" :key="s" :value="s">{{ statusLabel(s) }}</option>
                </select>
              </td>
              <td>
                <input
                  type="date"
                  class="form-control-sm"
                  :value="j.scheduled_date?.slice(0, 10) ?? ''"
                  @change="updateJob(j, 'scheduled_date', $event.target.value)"
                >
              </td>
              <td>{{ j.notes || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No jobs scheduled yet.</p>
      </div>
    </AdminCard>
  </AdminLayout>
</template>
