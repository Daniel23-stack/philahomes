<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';

defineProps({ services: Array });
</script>

<template>
  <Head title="Services" />
  <PublicLayout>
    <div class="mx-auto max-w-7xl px-4 py-16">
      <h1 class="section-heading">Our services</h1>
      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          v-for="s in services"
          :key="s.slug"
          :href="`/services/${s.slug}`"
          class="rounded-xl border border-slate-200 p-6 transition hover:border-[var(--color-accent)] hover:shadow-md"
        >
          <h2 class="text-lg font-semibold text-[var(--color-primary)]">{{ s.name }}</h2>
          <p class="mt-2 text-slate-600">{{ s.shortDescription }}</p>
        </Link>
      </div>
    </div>
  </PublicLayout>
</template>
