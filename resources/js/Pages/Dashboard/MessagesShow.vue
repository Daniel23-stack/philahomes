<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import ClientLayout from '@/Layouts/ClientLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDateTime } from '@/utils/admin';

const props = defineProps({ conversation: Object });
const page = usePage();
const flash = () => page.props.flash?.status;

const replyForm = useForm({ body: '' });

function sendReply() {
  replyForm.post(`/dashboard/messages/${props.conversation.id}/reply`, {
    preserveScroll: true,
    onSuccess: () => replyForm.reset(),
  });
}
</script>

<template>
  <Head title="Conversation" />
  <ClientLayout title="Conversation" subtitle="Message thread with Okuhle Homes.">
    <Link href="/dashboard/messages" class="btn-lte btn-lte-secondary mb-3">
      <i class="fas fa-arrow-left" /> Back to messages
    </Link>

    <p v-if="flash()" class="admin-flash">{{ flash() }}</p>

    <AdminCard
      v-for="msg in conversation.messages"
      :key="msg.id"
      :title="msg.sender_role === 'admin' ? 'Okuhle Homes' : 'You'"
      outline
      class="mb-3"
    >
      <template #tools>
        <small class="text-muted">{{ formatDateTime(msg.created_at) }}</small>
      </template>
      <p style="white-space: pre-wrap; margin: 0">{{ msg.body }}</p>
    </AdminCard>

    <AdminCard title="Reply" outline>
      <form class="admin-form" @submit.prevent="sendReply">
        <div class="admin-field">
          <label>Your message</label>
          <textarea v-model="replyForm.body" class="form-control" rows="4" required />
        </div>
        <button type="submit" class="btn-lte btn-lte-primary" :disabled="replyForm.processing">Send reply</button>
      </form>
    </AdminCard>
  </ClientLayout>
</template>
