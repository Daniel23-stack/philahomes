<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  variant: { type: String, default: 'default' },
  animation: { type: String, default: 'fade-up' },
  delay: { type: Number, default: 0 },
  tilt: { type: Boolean, default: true },
  step: { type: Number, default: null },
});

const wrapper = ref(null);
const inner = ref(null);
const visible = ref(false);
const hovered = ref(false);
const rotate = ref({ x: 0, y: 0 });

const useTilt = computed(() => props.tilt && !['image', 'glass', 'info', 'stat'].includes(props.variant));
const useShine = computed(() => !['image', 'glass', 'info'].includes(props.variant));
const isStep = computed(() => props.step != null);

let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );
  if (wrapper.value) observer.observe(wrapper.value);
});

onUnmounted(() => observer?.disconnect());

function onMove(e) {
  if (!useTilt.value || !inner.value) return;
  const rect = inner.value.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  rotate.value = { x: -y * 5, y: x * 5 };
}

function onLeave() {
  rotate.value = { x: 0, y: 0 };
  hovered.value = false;
}

const motionStyle = computed(() => {
  if (!useTilt.value) {
    return hovered.value ? { transform: 'translateY(-4px)' } : {};
  }
  const lift = hovered.value ? -6 : 0;
  return {
    transform: `perspective(800px) rotateX(${rotate.value.x}deg) rotateY(${rotate.value.y}deg) translateY(${lift}px)`,
  };
});
</script>

<template>
  <div
    ref="wrapper"
    class="motion-card-outer"
    :class="{ 'motion-card-outer--step': isStep }"
  >
    <div
      :class="['scroll-reveal', `scroll-reveal--${animation}`, { 'is-visible': visible }]"
      :style="{ transitionDelay: `${delay}ms` }"
    >
      <div
        ref="inner"
        class="motion-card"
        :class="[
          `motion-card--${variant}`,
          { 'motion-card--active': hovered },
        ]"
        :style="motionStyle"
        @mousemove="onMove"
        @mouseenter="hovered = true"
        @mouseleave="onLeave"
      >
        <div v-if="useShine" class="motion-card__shine" aria-hidden="true" />
        <span v-if="isStep" class="step-badge">{{ step }}</span>
        <div class="motion-card__content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
