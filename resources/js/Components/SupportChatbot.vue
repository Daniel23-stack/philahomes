<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <button
    type="button"
    class="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-lg shadow-orange-500/30 transition-transform duration-200 hover:scale-105"
    :aria-label="open ? 'Close chat' : 'Open support chat'"
    @click="open = !open"
  >
    <svg v-if="!open" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
    <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <div
    v-if="open"
    class="fixed bottom-24 right-6 z-40 w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
  >
    <div class="flex items-center gap-3 bg-[var(--color-primary)] px-4 py-3.5">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
        <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-semibold text-white">Okuhle Homes Support</p>
        <p class="text-xs text-white/70">We're here to help</p>
      </div>
    </div>

    <div class="flex flex-col items-center gap-4 px-6 py-8 text-center">
      <div class="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
        <svg class="h-7 w-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p class="font-semibold text-slate-800">Chat coming soon</p>
        <p class="mt-1.5 text-sm text-slate-500">
          Our live chat feature is currently under development and will be available shortly.
        </p>
      </div>
      <div class="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        In the meantime, reach us via the
        <a href="#contact" class="font-medium text-[var(--color-accent)] hover:underline" @click="open = false">contact form</a>
        or
        <a href="#quote" class="font-medium text-[var(--color-accent)] hover:underline" @click="open = false">request a quote</a>.
      </div>
    </div>
  </div>
</template>
