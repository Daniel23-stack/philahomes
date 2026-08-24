<script setup>
defineProps({
  title: { type: String, default: '' },
  outline: { type: Boolean, default: false },
  flush: { type: Boolean, default: false },
  collapsed: { type: Boolean, default: false },
});
</script>

<template>
  <div class="card" :class="{ 'card-outline': outline }">
    <div v-if="title || $slots.tools" class="card-header">
      <h3 v-if="title" class="card-title">{{ title }}</h3>
      <div v-if="$slots.tools" class="card-tools">
        <slot name="tools" />
      </div>
    </div>
    <div class="card-body" :class="{ 'p-0': flush }">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
