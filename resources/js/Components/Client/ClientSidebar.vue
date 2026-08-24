<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import SiteLogo from '@/Components/SiteLogo.vue';

const open = defineModel('open', { type: Boolean, default: false });

const page = usePage();
const user = computed(() => page.props.auth?.user);

const nav = [
  { label: 'Overview', href: '/dashboard', icon: 'fa-tachometer-alt', match: (url) => url === '/dashboard' },
  { label: 'My requests', href: '/dashboard/requests', icon: 'fa-clipboard-list', match: (url) => url.startsWith('/dashboard/requests') },
  { label: 'Quotes', href: '/dashboard/quotes', icon: 'fa-file-invoice', match: (url) => url.startsWith('/dashboard/quotes') },
  { label: 'Jobs', href: '/dashboard/jobs', icon: 'fa-tools', match: (url) => url.startsWith('/dashboard/jobs') },
  { label: 'Invoices', href: '/dashboard/invoices', icon: 'fa-file-invoice-dollar', match: (url) => url.startsWith('/dashboard/invoices') },
  { label: 'Service catalog', href: '/dashboard/catalog', icon: 'fa-box-open', match: (url) => url === '/dashboard/catalog' },
  { label: 'Retired services', href: '/dashboard/catalog/retired', icon: 'fa-archive', match: (url) => url.startsWith('/dashboard/catalog/retired') },
  { label: 'Messages', href: '/dashboard/messages', icon: 'fa-comments', match: (url) => url.startsWith('/dashboard/messages') },
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
      <SiteLogo href="/dashboard" size="compact" variant="dark" @click="close" />
      <small class="lte-brand-sub">Client portal</small>
    </div>

    <div v-if="user" class="lte-user-panel">
      <div class="lte-user-panel__info">
        <p class="lte-user-panel__name">{{ user.name }}</p>
        <span class="lte-user-panel__badge lte-user-panel__badge--client">Client</span>
      </div>
    </div>

    <nav class="lte-sidebar__nav">
      <ul class="lte-nav">
        <li class="lte-nav-header">My account</li>
        <li v-for="item in nav" :key="item.href" class="lte-nav-item">
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
      </ul>
    </nav>
  </aside>
</template>
