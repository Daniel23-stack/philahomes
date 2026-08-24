<script setup>
import { Head } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';
</script>

<template>
  <Head title="How it works" />
  <PublicLayout>
    <div class="mx-auto max-w-3xl px-4 py-16">
      <h1 class="section-heading">How it works</h1>
      <ol class="mt-8 list-decimal space-y-4 pl-5 text-slate-700">
        <li>Submit a quote request with your project details.</li>
        <li>We review and send a tailored quote.</li>
        <li>Accept the quote and we schedule the job.</li>
        <li>Work completed — invoice and follow-up support.</li>
      </ol>
    </div>
  </PublicLayout>
</template>
