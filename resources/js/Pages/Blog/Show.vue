<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';

defineProps({ post: Object });
</script>

<template>
  <Head :title="post.title" />
  <PublicLayout>
    <article class="mx-auto max-w-3xl px-4 py-16 readable">
      <Link href="/blog" class="text-sm text-[var(--color-accent)]">← Blog</Link>
      <h1 class="section-heading mt-4">{{ post.title }}</h1>
      <div class="mt-8 whitespace-pre-wrap text-slate-700">{{ post.body }}</div>
    </article>
  </PublicLayout>
</template>
