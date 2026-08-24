<script setup>
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import axios from 'axios';
import PublicLayout from '@/Layouts/PublicLayout.vue';

const props = defineProps({ services: Array });

const form = ref({
  serviceCategory: '',
  subService: '',
  description: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
});
const status = ref('idle');

async function submit() {
  status.value = 'loading';
  try {
    await axios.post('/api/requests', form.value);
    status.value = 'success';
  } catch {
    status.value = 'error';
  }
}
</script>

<template>
  <Head title="Request a Quote" />
  <PublicLayout>
    <div class="mx-auto max-w-2xl px-4 py-16">
      <h1 class="section-heading">Request a quote</h1>
      <form class="mt-8 space-y-4" @submit.prevent="submit">
        <div>
          <label class="block text-sm font-medium">Service</label>
          <select v-model="form.serviceCategory" required class="mt-1 w-full rounded-lg border px-3 py-2">
            <option value="">Select a service</option>
            <option v-for="s in services" :key="s.slug" :value="s.slug">{{ s.name }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium">Description</label>
          <textarea v-model="form.description" required rows="4" class="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium">Your name</label>
          <input v-model="form.contactName" required class="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input v-model="form.contactEmail" type="email" required class="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium">Phone (optional)</label>
          <input v-model="form.contactPhone" class="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <p v-if="status === 'success'" class="text-green-600">Request submitted. We'll be in touch.</p>
        <p v-if="status === 'error'" class="text-red-600">Something went wrong. Please try again.</p>
        <button type="submit" class="btn-primary w-full" :disabled="status === 'loading'">Submit request</button>
      </form>
    </div>
  </PublicLayout>
</template>
