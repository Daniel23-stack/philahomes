<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';

const props = defineProps({ post: Object });
const isEdit = !!props.post;

const form = useForm({
  title: props.post?.title ?? '',
  slug: props.post?.slug ?? '',
  excerpt: props.post?.excerpt ?? '',
  body: props.post?.body ?? '',
  category: props.post?.category ?? '',
  published_at: props.post?.published_at?.slice(0, 16) ?? '',
});

function submit() {
  if (isEdit) {
    form.patch(`/admin/blog/${props.post.id}`);
  } else {
    form.post('/admin/blog');
  }
}
</script>

<template>
  <Head :title="isEdit ? 'Edit post' : 'New post'" />
  <AdminLayout :title="isEdit ? 'Edit post' : 'Create post'" subtitle="Publish tips, news, and project highlights.">
    <Link href="/admin/blog" class="btn-lte btn-lte-secondary mb-3">
      <i class="fas fa-arrow-left" /> Back to posts
    </Link>

    <AdminCard :title="isEdit ? 'Edit post' : 'New post'" outline>
      <form class="admin-form" @submit.prevent="submit">
        <div class="admin-form__grid">
          <div class="admin-field" style="grid-column: 1 / -1">
            <label>Title</label>
            <input v-model="form.title" class="form-control" required>
          </div>
          <div class="admin-field">
            <label>Slug (optional)</label>
            <input v-model="form.slug" class="form-control" placeholder="auto-generated from title">
          </div>
          <div class="admin-field">
            <label>Category</label>
            <input v-model="form.category" class="form-control">
          </div>
          <div class="admin-field" style="grid-column: 1 / -1">
            <label>Excerpt</label>
            <textarea v-model="form.excerpt" class="form-control" rows="2" />
          </div>
          <div class="admin-field" style="grid-column: 1 / -1">
            <label>Body</label>
            <textarea v-model="form.body" class="form-control" rows="12" required />
          </div>
          <div class="admin-field">
            <label>Publish date</label>
            <input v-model="form.published_at" type="datetime-local" class="form-control">
          </div>
        </div>
        <button type="submit" class="btn-lte btn-lte-primary" :disabled="form.processing">
          {{ isEdit ? 'Save changes' : 'Publish post' }}
        </button>
      </form>
    </AdminCard>
  </AdminLayout>
</template>
