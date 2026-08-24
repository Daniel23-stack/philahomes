<script setup>
import { ref } from 'vue';
import axios from 'axios';
import ScrollReveal from '@/Components/ScrollReveal.vue';

const email = ref('');
const status = ref('idle');

async function submit(e) {
  e.preventDefault();
  if (!email.value.trim()) return;
  status.value = 'loading';
  try {
    await axios.post('/api/newsletter', { email: email.value.trim() });
    status.value = 'success';
    email.value = '';
  } catch {
    status.value = 'error';
  }
}
</script>

<template>
  <section id="newsletter" class="scroll-mt-24 relative overflow-hidden py-24 sm:py-28">
    <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[#243f6a] to-[#1a2f4f]" />
    <div class="gradient-orb gradient-orb--accent -left-20 top-0 h-80 w-80 opacity-25" />
    <div class="gradient-orb gradient-orb--gold -right-20 bottom-0 h-72 w-72 opacity-20" />
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%221%22 cy=%221%22 r=%221%22/%3E%3C/g%3E%3C/svg%3E')]" />

    <ScrollReveal animation="fade-up">
      <div class="relative mx-auto max-w-2xl px-4 text-center text-white sm:px-6">
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-highlight)]">Stay in touch</p>
        <h2 class="mt-3 text-3xl font-light sm:text-4xl">Subscribe to our newsletter</h2>
        <div class="accent-line mx-auto" />
        <p class="mt-4 text-slate-200">Get updates on offers, tips, and news from Okuhle Homes.</p>
        <form class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center" @submit="submit">
          <input
            v-model="email"
            type="email"
            required
            placeholder="Enter your email address"
            class="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white backdrop-blur-sm placeholder:text-slate-400 transition focus:border-[var(--color-highlight)] focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]/30"
            :disabled="status === 'loading'"
          />
          <button
            type="submit"
            class="rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-orange-500 px-6 py-3.5 font-medium text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:shadow-orange-500/40 disabled:opacity-70"
            :disabled="status === 'loading'"
          >
            {{ status === 'loading' ? 'Subscribing…' : status === 'success' ? 'Subscribed ✓' : 'Subscribe' }}
          </button>
        </form>
        <p v-if="status === 'success'" class="mt-3 text-sm text-[var(--color-highlight)]">Thanks for subscribing.</p>
        <p v-if="status === 'error'" class="mt-3 text-sm text-red-300">Subscription failed. Please try again.</p>
      </div>
    </ScrollReveal>
  </section>
</template>
