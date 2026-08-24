<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';

defineProps({ service: Object });
</script>

<template>
  <Head :title="service.name" />
  <PublicLayout>
    <div class="mx-auto max-w-3xl px-4 py-16">
      <Link href="/services" class="text-sm text-[var(--color-accent)]">← All services</Link>
      <h1 class="section-heading mt-4">{{ service.name }}</h1>
      <p class="mt-4 text-lg text-slate-600">{{ service.shortDescription }}</p>
      <ul v-if="service.subcategories?.length" class="mt-8 list-disc space-y-2 pl-5 text-slate-700">
        <li v-for="sub in service.subcategories" :key="sub.id">{{ sub.name }}</li>
      </ul>
      <Link href="/request-quote" class="btn-primary mt-10 inline-flex">Request a quote</Link>
    </div>
  </PublicLayout>
</template>
