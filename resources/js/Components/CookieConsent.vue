<script setup>
import { ref, onMounted } from 'vue';

const STORAGE_KEY = 'okuhle_cookie_consent';
const visible = ref(false);
const showDetails = ref(false);

const prefs = ref({
  necessary: true,
  analytics: false,
  marketing: false,
});

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    setTimeout(() => { visible.value = true; }, 800);
  }
});

function acceptAll() {
  prefs.value.analytics = true;
  prefs.value.marketing = true;
  save();
}

function rejectOptional() {
  prefs.value.analytics = false;
  prefs.value.marketing = false;
  save();
}

function saveCustom() {
  save();
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    necessary: true,
    analytics: prefs.value.analytics,
    marketing: prefs.value.marketing,
    savedAt: new Date().toISOString(),
  }));
  visible.value = false;
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-8 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-8 opacity-0"
  >
    <div
      v-if="visible"
      class="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-2xl shadow-slate-900/10 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-2xl sm:border"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
    >
      <!-- Header -->
      <div class="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50">
          <svg class="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-slate-800">We use cookies</p>
          <p class="text-xs text-slate-500">Okuhle Homes</p>
        </div>
      </div>

      <!-- Body -->
      <div class="px-5 py-4">
        <p class="text-sm text-slate-600">
          We use cookies to improve your browsing experience, analyse traffic, and personalise content.
          By clicking <strong>Accept all</strong> you consent to our use of cookies.
          <button
            type="button"
            class="ml-1 text-[var(--color-accent)] underline-offset-2 hover:underline text-sm"
            @click="showDetails = !showDetails"
          >
            {{ showDetails ? 'Hide details' : 'Manage preferences' }}
          </button>
        </p>

        <!-- Expandable preferences -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out overflow-hidden"
          enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-96 opacity-100"
          leave-active-class="transition-all duration-150 ease-in overflow-hidden"
          leave-from-class="max-h-96 opacity-100"
          leave-to-class="max-h-0 opacity-0"
        >
          <div v-if="showDetails" class="mt-4 space-y-3">
            <!-- Necessary -->
            <div class="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
              <div>
                <p class="text-xs font-semibold text-slate-700">Necessary</p>
                <p class="text-xs text-slate-500">Required for the site to function. Cannot be disabled.</p>
              </div>
              <span class="mt-0.5 shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Always on</span>
            </div>

            <!-- Analytics -->
            <div class="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
              <div>
                <p class="text-xs font-semibold text-slate-700">Analytics</p>
                <p class="text-xs text-slate-500">Helps us understand how visitors use the site.</p>
              </div>
              <button
                type="button"
                class="relative mt-0.5 shrink-0 h-5 w-9 rounded-full transition-colors duration-200"
                :class="prefs.analytics ? 'bg-[var(--color-accent)]' : 'bg-slate-300'"
                :aria-checked="prefs.analytics"
                role="switch"
                @click="prefs.analytics = !prefs.analytics"
              >
                <span
                  class="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
                  :class="prefs.analytics ? 'translate-x-4' : 'translate-x-0'"
                />
              </button>
            </div>

            <!-- Marketing -->
            <div class="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
              <div>
                <p class="text-xs font-semibold text-slate-700">Marketing</p>
                <p class="text-xs text-slate-500">Used to show relevant ads and promotions.</p>
              </div>
              <button
                type="button"
                class="relative mt-0.5 shrink-0 h-5 w-9 rounded-full transition-colors duration-200"
                :class="prefs.marketing ? 'bg-[var(--color-accent)]' : 'bg-slate-300'"
                :aria-checked="prefs.marketing"
                role="switch"
                @click="prefs.marketing = !prefs.marketing"
              >
                <span
                  class="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
                  :class="prefs.marketing ? 'translate-x-4' : 'translate-x-0'"
                />
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Actions -->
      <div class="flex flex-wrap gap-2 border-t border-slate-100 px-5 py-4">
        <button
          v-if="showDetails"
          type="button"
          class="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          @click="saveCustom"
        >
          Save preferences
        </button>
        <button
          type="button"
          class="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          @click="rejectOptional"
        >
          Reject optional
        </button>
        <button
          type="button"
          class="flex-1 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          @click="acceptAll"
        >
          Accept all
        </button>
      </div>
    </div>
  </Transition>
</template>
