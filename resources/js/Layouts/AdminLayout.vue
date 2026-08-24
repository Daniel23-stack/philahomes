<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AdminSidebar from '@/Components/Admin/AdminSidebar.vue';

defineProps({
  title: { type: String, default: 'Admin' },
  subtitle: { type: String, default: '' },
});

const page = usePage();
const user = computed(() => page.props.auth?.user);
const sidebarOpen = ref(false);
const userMenuOpen = ref(false);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
</script>

<template>
  <div class="lte-wrapper admin-shell">
    <AdminSidebar v-model:open="sidebarOpen" />

    <div class="lte-content-wrapper" :class="{ 'sidebar-open': sidebarOpen }">
      <nav class="lte-navbar">
        <ul class="lte-navbar__left">
          <li>
            <button type="button" class="lte-navbar__toggle" aria-label="Toggle menu" @click="toggleSidebar">
              <i class="fas fa-bars" />
            </button>
          </li>
          <li class="lte-navbar__item d-none-sm">
            <Link href="/" class="lte-navbar__link">View site</Link>
          </li>
        </ul>

        <ul class="lte-navbar__right">
          <li class="lte-navbar__item lte-navbar__user">
            <button type="button" class="lte-navbar__user-btn" @click="userMenuOpen = !userMenuOpen">
              <i class="far fa-user-circle lte-navbar__avatar" />
              <span class="d-none-sm">{{ user?.name }}</span>
              <i class="fas fa-caret-down lte-navbar__caret" />
            </button>
            <div v-if="userMenuOpen" class="lte-dropdown">
              <div class="lte-dropdown__header">
                <p class="lte-dropdown__name">{{ user?.name }}</p>
                <p class="lte-dropdown__email">{{ user?.email }}</p>
              </div>
              <div class="lte-dropdown__body">
                <Link href="/logout" method="post" as="button" class="lte-dropdown__item">Sign out</Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <div class="lte-content-header">
        <div class="lte-container-fluid">
          <div class="lte-content-header__row">
            <div>
              <h1>{{ title }}</h1>
              <p v-if="subtitle" class="lte-content-header__subtitle">{{ subtitle }}</p>
            </div>
            <ol class="lte-breadcrumb">
              <li><Link href="/admin">Home</Link></li>
              <li class="active">{{ title }}</li>
            </ol>
          </div>
        </div>
      </div>

      <section class="lte-content">
        <div class="lte-container-fluid">
          <slot />
        </div>
      </section>

      <footer class="lte-footer">
        <strong>Okuhle Homes</strong> Admin &copy; {{ new Date().getFullYear() }}
      </footer>
    </div>

    <div v-if="sidebarOpen" class="lte-sidebar-overlay lg:hidden" @click="sidebarOpen = false" />
  </div>
</template>
