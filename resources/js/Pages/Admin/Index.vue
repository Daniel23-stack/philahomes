<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import AdminSmallBox from '@/Components/Admin/AdminSmallBox.vue';

const props = defineProps({ stats: Object });

const statCards = computed(() => [
  { key: 'requests', label: 'Service requests', href: '/admin/requests', icon: 'fa-inbox', color: 'info' },
  { key: 'quotes', label: 'Quotes', href: '/admin/quotes', icon: 'fa-file-invoice', color: 'success' },
  { key: 'jobs', label: 'Jobs', href: '/admin/jobs', icon: 'fa-tools', color: 'warning' },
  { key: 'invoices', label: 'Invoices', href: '/admin/invoices', icon: 'fa-file-invoice-dollar', color: 'danger' },
  { key: 'users', label: 'Users', href: '/admin/users', icon: 'fa-users', color: 'primary' },
  { key: 'messages', label: 'Conversations', href: '/admin/messages', icon: 'fa-comments', color: 'teal' },
  { key: 'contacts', label: 'Contact inbox', href: '/admin/contacts', icon: 'fa-envelope', color: 'secondary' },
  { key: 'subscribers', label: 'Newsletter', href: '/admin/newsletter', icon: 'fa-mail-bulk', color: 'indigo' },
]);

const quickLinks = [
  { label: 'View requests', href: '/admin/requests' },
  { label: 'Create quote', href: '/admin/quotes' },
  { label: 'Manage catalog', href: '/admin/catalog' },
  { label: 'Write blog post', href: '/admin/blog/create' },
  { label: 'Analytics', href: '/admin/analytics' },
  { label: 'Activity logs', href: '/admin/logs' },
];
</script>

<template>
  <Head title="Admin" />
  <AdminLayout title="Dashboard" subtitle="Monitor requests, quotes, jobs, invoices, and communications.">
    <div class="lte-row">
      <div v-for="card in statCards" :key="card.key" class="lte-col-3">
        <AdminSmallBox
          :label="card.label"
          :value="stats?.[card.key] ?? 0"
          :href="card.href"
          :icon="card.icon"
          :color="card.color"
        />
      </div>
    </div>

    <AdminCard title="Quick actions" outline class="mb-4">
      <div class="admin-actions">
        <Link v-for="link in quickLinks" :key="link.href" :href="link.href" class="btn-lte btn-lte-secondary">
          {{ link.label }}
        </Link>
      </div>
    </AdminCard>
  </AdminLayout>
</template>
