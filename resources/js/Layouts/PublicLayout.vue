<script setup>
import { usePage } from '@inertiajs/vue3';
import { computed, onMounted } from 'vue';
import SiteHeader from '@/Components/SiteHeader.vue';
import SiteFooter from '@/Components/SiteFooter.vue';
import SupportChatbot from '@/Components/SupportChatbot.vue';
import CookieConsent from '@/Components/CookieConsent.vue';

const page = usePage();
const showChat = computed(() => !page.url.startsWith('/admin'));
const isHome = computed(() => page.component === 'Home');

function scrollToHash() {
  const hash = window.location.hash;
  if (!hash) return;
  setTimeout(() => {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 150);
}

onMounted(scrollToHash);
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <SiteHeader />
    <main class="flex-1" :class="isHome ? '' : 'pt-24'">
      <slot />
    </main>
    <SiteFooter />
    <SupportChatbot v-if="showChat" />
    <CookieConsent />
  </div>
</template>
