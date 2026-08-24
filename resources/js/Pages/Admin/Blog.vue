<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDate } from '@/utils/admin';

defineProps({ posts: Array });

function deletePost(id) {
  if (confirm('Delete this post?')) {
    router.delete(`/admin/blog/${id}`, { preserveScroll: true });
  }
}
</script>

<template>
  <Head title="Blog" />
  <AdminLayout title="Blog posts" subtitle="Manage articles shown on the public site.">
    <AdminCard title="All posts" outline flush>
      <template #tools>
        <Link href="/admin/blog/create" class="btn-lte btn-lte-primary">
          <i class="fas fa-plus" /> New post
        </Link>
      </template>

      <div v-if="posts?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Published</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id" class="admin-table__row">
              <td>
                <strong>{{ post.title }}</strong><br>
                <small class="text-muted">/blog/{{ post.slug }}</small>
              </td>
              <td>{{ post.category || '—' }}</td>
              <td>{{ formatDate(post.published_at) }}</td>
              <td class="admin-actions">
                <Link :href="`/admin/blog/${post.id}/edit`" class="btn-lte btn-lte-secondary">Edit</Link>
                <button type="button" class="btn-lte btn-lte-danger" @click="deletePost(post.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No blog posts yet.</p>
        <Link href="/admin/blog/create" class="btn-lte btn-lte-primary" style="margin-top: 1rem">Write first post</Link>
      </div>
    </AdminCard>
  </AdminLayout>
</template>
