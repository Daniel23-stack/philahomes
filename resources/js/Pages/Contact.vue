<script setup>
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import axios from 'axios';
import PublicLayout from '@/Layouts/PublicLayout.vue';

const form = ref({ name: '', contact: '', query: '' });
const status = ref('idle');

async function submit() {
  status.value = 'sending';
  try {
    await axios.post('/api/contact', form.value);
    status.value = 'sent';
    form.value = { name: '', contact: '', query: '' };
  } catch {
    status.value = 'error';
  }
}
</script>

<template>
  <Head title="Contact" />
  <PublicLayout>
    <div class="mx-auto max-w-3xl px-4 py-16">
      <h1 class="section-heading">Contact us</h1>
      <p class="mt-4 text-slate-600">Send us a message and we'll get back to you.</p>
      <form class="mt-8 space-y-4" @submit.prevent="submit">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="form.name" required class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email or Phone</label>
          <input v-model="form.contact" required class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Message</label>
          <textarea v-model="form.query" required rows="4" class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2" />
        </div>
        <p v-if="status === 'sent'" class="text-sm text-green-600">Thank you. We will get back to you soon.</p>
        <p v-if="status === 'error'" class="text-sm text-red-600">Something went wrong. Please try again.</p>
        <button type="submit" class="btn-primary w-full" :disabled="status === 'sending'">
          {{ status === 'sending' ? 'Sending…' : 'Send inquiry' }}
        </button>
      </form>
    </div>
  </PublicLayout>
</template>
