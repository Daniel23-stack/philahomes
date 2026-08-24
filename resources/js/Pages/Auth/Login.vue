<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';

const form = useForm({ email: '', password: '', remember: false });
const status = usePage().props.flash?.status;

function submit() {
  form.post('/login');
}
</script>

<template>
  <Head title="Login" />
  <PublicLayout>
    <div class="mx-auto max-w-md px-4 py-16">
      <h1 class="section-heading">Sign in</h1>
      <p v-if="status" class="mt-4 text-sm text-green-600">{{ status }}</p>
      <form class="mt-8 space-y-4" @submit.prevent="submit">
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input v-model="form.email" type="email" required class="mt-1 w-full rounded-lg border px-3 py-2" />
          <p v-if="form.errors.email" class="mt-1 text-sm text-red-600">{{ form.errors.email }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium">Password</label>
          <input v-model="form.password" type="password" required class="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <label class="flex items-center gap-2 text-sm">
          <input v-model="form.remember" type="checkbox" /> Remember me
        </label>
        <button type="submit" class="btn-primary w-full" :disabled="form.processing">Sign in</button>
      </form>
      <p class="mt-4 text-center text-sm">
        No account? <Link href="/register" class="text-[var(--color-accent)]">Register</Link>
      </p>
    </div>
  </PublicLayout>
</template>
