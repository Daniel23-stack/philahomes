<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  animation: { type: String, default: 'fade-up' },
  delay: { type: Number, default: 0 },
  once: { type: Boolean, default: true },
});

const el = ref(null);
const visible = ref(false);
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true;
        if (props.once) observer?.disconnect();
      } else if (!props.once) {
        visible.value = false;
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
  );
  if (el.value) observer.observe(el.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <div
    ref="el"
    :class="['scroll-reveal', `scroll-reveal--${animation}`, { 'is-visible': visible }]"
    :style="{ transitionDelay: `${delay}ms` }"
  >
    <slot />
  </div>
</template>
