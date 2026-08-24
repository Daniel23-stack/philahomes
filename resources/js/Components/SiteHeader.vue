<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import SiteLogo from '@/Components/SiteLogo.vue';

const page = usePage();
const user = computed(() => page.props.auth?.user);
const isHome = computed(() => page.component === 'Home');

const mobileOpen = ref(false);
const activeSection = ref('home');

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

function sectionHref(id) {
  return isHome.value ? `#${id}` : `/#${id}`;
}

function closeMobile() {
  mobileOpen.value = false;
}

let observer;

onMounted(() => {
  if (!isHome.value) return;

  const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
  if (!sections.length) return;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <header class="fixed left-0 right-0 top-0 z-50 w-full">
    <div class="w-full border-b border-slate-200/80 bg-white/90 shadow-md shadow-slate-900/5 backdrop-blur-xl">
      <div class="flex h-20 items-center justify-between gap-4 px-4 sm:h-24 sm:px-6 lg:px-10">
        <SiteLogo :href="isHome ? '#home' : '/'" size="default" />

        <!-- Desktop nav -->
        <nav class="ml-auto hidden items-center gap-1 lg:flex">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="sectionHref(item.id)"
            class="relative rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200"
            :class="isHome && activeSection === item.id
              ? 'text-[var(--color-accent)] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-[var(--color-highlight)]'
              : 'text-slate-600 hover:bg-slate-100 hover:text-[var(--color-primary)]'"
          >
            {{ item.label }}
          </a>
          <a href="#quote" class="ml-2 btn-primary py-2 text-sm">Request a quote</a>
          <template v-if="user">
            <Link v-if="user.role === 'admin'" href="/admin" class="rounded-xl px-3 py-2 text-sm font-medium text-[var(--color-accent)]">Admin</Link>
            <Link v-else href="/dashboard" class="rounded-xl px-3 py-2 text-sm font-medium text-slate-600">Dashboard</Link>
            <Link href="/logout" method="post" as="button" class="rounded-xl px-3 py-2 text-sm font-medium text-slate-600">Logout</Link>
          </template>
          <template v-else>
            <Link href="/login" class="rounded-xl px-3 py-2 text-sm font-medium text-slate-600">Login</Link>
          </template>
        </nav>

        <!-- Mobile toggle -->
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 lg:hidden"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile nav -->
      <nav
        v-show="mobileOpen"
        class="border-t border-slate-200 bg-white px-4 py-4 lg:hidden"
      >
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="sectionHref(item.id)"
          class="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          @click="closeMobile"
        >
          {{ item.label }}
        </a>
        <a href="#quote" class="btn-primary mt-3 block w-full text-center text-sm" @click="closeMobile">Request a quote</a>
        <div class="mt-3 border-t border-slate-100 pt-3">
          <Link v-if="user?.role === 'admin'" href="/admin" class="block px-3 py-2 text-sm text-[var(--color-accent)]" @click="closeMobile">Admin</Link>
          <Link v-else-if="user" href="/dashboard" class="block px-3 py-2 text-sm text-slate-600" @click="closeMobile">Dashboard</Link>
          <Link v-if="user" href="/logout" method="post" as="button" class="block w-full px-3 py-2 text-left text-sm text-slate-600" @click="closeMobile">Logout</Link>
          <Link v-else href="/login" class="block px-3 py-2 text-sm text-slate-600" @click="closeMobile">Login</Link>
        </div>
      </nav>
    </div>
  </header>
</template>
