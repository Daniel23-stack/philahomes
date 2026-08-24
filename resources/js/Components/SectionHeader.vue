<script setup>
import { ref } from 'vue';

defineProps({
  label: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  dark: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
});

const root = ref(null);
const ripples = ref([]);

function spawnRipple(event) {
  if (!root.value) return;

  const rect = root.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const baseId = Date.now();

  [0, 1, 2].forEach((ring) => {
    ripples.value.push({
      id: baseId + ring,
      x,
      y,
      ring,
      delay: ring * 140,
    });
  });

  window.setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id < baseId || r.id > baseId + 2);
  }, 1400);
}
</script>

<template>
  <div
    ref="root"
    class="section-header"
    :class="[
      align === 'center' ? 'text-center' : 'text-left',
      dark ? 'section-header--dark' : 'section-header--light',
    ]"
    role="presentation"
    @click="spawnRipple"
  >
    <div class="section-header__surface" aria-hidden="true" />

    <span
      v-for="ripple in ripples"
      :key="ripple.id"
      class="section-header__ripple"
      :class="`section-header__ripple--${ripple.ring}`"
      :style="{
        left: `${ripple.x}px`,
        top: `${ripple.y}px`,
        animationDelay: `${ripple.delay}ms`,
      }"
    />

    <div class="section-header__content">
      <p v-if="label" class="section-label">{{ label }}</p>
      <h2 :class="['section-heading', dark && '!text-white']">{{ title }}</h2>
      <div class="accent-line accent-line--water" :class="align === 'center' ? 'mx-auto' : ''">
        <span class="accent-line__wave" aria-hidden="true" />
      </div>
      <p
        v-if="subtitle"
        :class="[
          'mt-4',
          dark ? 'text-slate-300' : 'text-slate-600',
          align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl',
        ]"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
