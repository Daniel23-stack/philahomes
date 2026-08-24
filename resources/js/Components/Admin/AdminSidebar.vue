<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import SiteLogo from '@/Components/SiteLogo.vue';

const open = defineModel('open', { type: Boolean, default: false });

const page = usePage();
const user = computed(() => page.props.auth?.user);

const sections = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', icon: 'fa-tachometer-alt', match: (url) => url === '/admin' },
      { label: 'Analytics', href: '/admin/analytics', icon: 'fa-chart-bar', match: (url) => url.startsWith('/admin/analytics') },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Requests', href: '/admin/requests', icon: 'fa-inbox', match: (url) => url.startsWith('/admin/requests') },
      { label: 'Quotes', href: '/admin/quotes', icon: 'fa-file-invoice', match: (url) => url.startsWith('/admin/quotes') },
      { label: 'Jobs', href: '/admin/jobs', icon: 'fa-tools', match: (url) => url.startsWith('/admin/jobs') },
      { label: 'Invoices', href: '/admin/invoices', icon: 'fa-file-invoice-dollar', match: (url) => url.startsWith('/admin/invoices') },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Catalog', href: '/admin/catalog', icon: 'fa-box-open', match: (url) => url.startsWith('/admin/catalog') },
      { label: 'Blog', href: '/admin/blog', icon: 'fa-newspaper', match: (url) => url.startsWith('/admin/blog') },
    ],
  },
  {
    label: 'Communication',
    items: [
      { label: 'Messages', href: '/admin/messages', icon: 'fa-comments', match: (url) => url.startsWith('/admin/messages') },
      { label: 'Contact inbox', href: '/admin/contacts', icon: 'fa-envelope', match: (url) => url.startsWith('/admin/contacts') },
      { label: 'Newsletter', href: '/admin/newsletter', icon: 'fa-mail-bulk', match: (url) => url.startsWith('/admin/newsletter') },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Users', href: '/admin/users', icon: 'fa-users', match: (url) => url.startsWith('/admin/users') },
      { label: 'Activity logs', href: '/admin/logs', icon: 'fa-history', match: (url) => url.startsWith('/admin/logs') },
    ],
  },
];

function isActive(item) {
  return item.match(page.url);
}

function close() {
  open.value = false;
}
</script>

<template>
  <aside class="lte-sidebar" :class="{ 'lte-sidebar--open': open }">
    <div class="lte-brand-link">
      <SiteLogo href="/admin" size="compact" variant="dark" @click="close" />
    </div>

    <div v-if="user" class="lte-user-panel">
      <div class="lte-user-panel__info">
        <p class="lte-user-panel__name">{{ user.name }}</p>
        <span class="lte-user-panel__badge">Admin</span>
      </div>
    </div>

    <nav class="lte-sidebar__nav">
      <ul class="lte-nav">
        <template v-for="section in sections" :key="section.label">
          <li class="lte-nav-header">{{ section.label }}</li>
          <li v-for="item in section.items" :key="item.href" class="lte-nav-item">
            <Link
              :href="item.href"
              class="lte-nav-link"
              :class="{ active: isActive(item) }"
              @click="close"
            >
              <i class="nav-icon fas" :class="item.icon" />
              <p>{{ item.label }}</p>
            </Link>
          </li>
        </template>
      </ul>
    </nav>
  </aside>
</template>
