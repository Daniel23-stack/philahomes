<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';

defineProps({ posts: Array });
</script>

<template>
  <Head title="Blog" />
  <PublicLayout>
    <div class="mx-auto max-w-3xl px-4 py-16">
      <h1 class="section-heading">Blog</h1>
      <ul class="mt-10 space-y-8">
        <li v-for="post in posts" :key="post.id">
          <Link :href="`/blog/${post.slug}`" class="text-xl font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]">
            {{ post.title }}
          </Link>
          <p v-if="post.excerpt" class="mt-2 text-slate-600">{{ post.excerpt }}</p>
        </li>
      </ul>
      <p v-if="!posts?.length" class="mt-8 text-slate-500">No posts yet.</p>
    </div>
  </PublicLayout>
</template>
