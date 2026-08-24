<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], default: 0 },
  href: { type: String, default: '' },
  icon: { type: String, default: 'fa-chart-bar' },
  color: { type: String, default: 'info' },
});
</script>

<template>
  <div class="small-box" :class="`bg-${color}`">
    <div class="inner">
      <h3>{{ value }}</h3>
      <p>{{ label }}</p>
    </div>
    <div class="icon">
      <i class="fas" :class="icon" />
    </div>
    <Link v-if="href" :href="href" class="small-box-footer">
      More info <i class="fas fa-arrow-circle-right" />
    </Link>
    <span v-else class="small-box-footer">&nbsp;</span>
  </div>
</template>
