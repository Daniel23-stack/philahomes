<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import PublicLayout from '@/Layouts/PublicLayout.vue';

const form = useForm({ name: '', email: '', password: '', password_confirmation: '' });

function submit() {
  form.post('/register');
}
</script>

<template>
  <Head title="Register" />
  <PublicLayout>
    <div class="mx-auto max-w-md px-4 py-16">
      <h1 class="section-heading">Create account</h1>
      <form class="mt-8 space-y-4" @submit.prevent="submit">
        <div>
          <label class="block text-sm font-medium">Name</label>
          <input v-model="form.name" class="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input v-model="form.email" type="email" required class="mt-1 w-full rounded-lg border px-3 py-2" />
          <p v-if="form.errors.email" class="mt-1 text-sm text-red-600">{{ form.errors.email }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium">Password</label>
          <input v-model="form.password" type="password" required class="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium">Confirm password</label>
          <input v-model="form.password_confirmation" type="password" required class="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <button type="submit" class="btn-primary w-full" :disabled="form.processing">Register</button>
      </form>
      <p class="mt-4 text-center text-sm">
        Already have an account? <Link href="/login" class="text-[var(--color-accent)]">Sign in</Link>
      </p>
    </div>
  </PublicLayout>
</template>
