<script setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
  href: { type: String, default: '/' },
  /** compact | default | large */
  size: { type: String, default: 'default' },
  /** light | dark — dark wraps logo on a white plate for navy sidebars */
  variant: { type: String, default: 'light' },
  asLink: { type: Boolean, default: true },
});

const emit = defineEmits(['click']);

const sizes = {
  compact: 'h-9 sm:h-10',
  default: 'h-12 sm:h-14',
  large: 'h-16 sm:h-20',
};

const isHash = computed(() => props.href.startsWith('#'));
const tag = computed(() => {
  if (!props.asLink) return 'div';
  return isHash.value ? 'a' : Link;
});
</script>

<template>
  <component
    :is="tag"
    v-bind="asLink && !isHash ? { href } : asLink ? { href } : {}"
    class="site-logo inline-flex flex-col items-start"
    :class="variant === 'dark' ? 'site-logo--dark' : ''"
    @click="emit('click', $event)"
  >
    <img
      src="/images/okuhle-logo.png"
      alt="Okuhle Building Solutions"
      class="site-logo__img w-auto object-contain"
      :class="sizes[size] || sizes.default"
      width="280"
      height="120"
      decoding="async"
    />
  </component>
</template>
