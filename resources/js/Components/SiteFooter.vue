<script setup>
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import SiteLogo from '@/Components/SiteLogo.vue';

const site = computed(() => usePage().props.site);

const links = [
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
  { id: 'quote', label: 'Request a Quote' },
];
</script>

<template>
  <footer class="border-t border-gray-200 bg-[var(--color-primary)] text-white">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <SiteLogo href="/" size="large" variant="dark" class="mb-4" />
          <p class="text-base leading-relaxed text-slate-200">{{ site.tagline }}</p>
        </div>
        <div>
          <h4 class="text-base font-semibold">Contact</h4>
          <ul class="mt-3 space-y-2 text-base text-slate-200">
            <li>{{ site.address }}</li>
            <li><a :href="`tel:${site.phone}`" class="hover:text-[var(--color-accent)]">{{ site.phone }}</a></li>
            <li><a :href="`mailto:${site.email}`" class="hover:text-[var(--color-accent)]">{{ site.email }}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-base font-semibold">Quick links</h4>
          <ul class="mt-3 space-y-2 text-base text-slate-200">
            <li v-for="link in links" :key="link.id">
              <a :href="`#${link.id}`" class="hover:text-[var(--color-accent)]">{{ link.label }}</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-base font-semibold">Get in touch</h4>
          <a
            :href="`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-3 inline-flex rounded-lg bg-green-600 px-4 py-2.5 text-base font-medium text-white hover:bg-green-700"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div class="mt-10 border-t border-slate-600 pt-6 text-center text-base text-slate-300">
        © {{ new Date().getFullYear() }} Okuhle Homes. All rights reserved.
      </div>
    </div>
  </footer>
</template>
