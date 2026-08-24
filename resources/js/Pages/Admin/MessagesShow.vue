<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatDateTime } from '@/utils/admin';

const props = defineProps({ conversation: Object });
const page = usePage();
const flash = () => page.props.flash?.status;

const replyForm = useForm({ body: '' });

function sendReply() {
  replyForm.post(`/admin/messages/${props.conversation.id}/reply`, {
    preserveScroll: true,
    onSuccess: () => replyForm.reset(),
  });
}
</script>

<template>
  <Head title="Conversation" />
  <AdminLayout :title="conversation.user?.name ?? 'Conversation'" :subtitle="conversation.user?.email">
    <Link href="/admin/messages" class="btn-lte btn-lte-secondary mb-3">
      <i class="fas fa-arrow-left" /> Back to inbox
    </Link>

    <p v-if="flash()" class="admin-flash">{{ flash() }}</p>

    <AdminCard
      v-for="msg in conversation.messages"
      :key="msg.id"
      :title="msg.sender_role"
      outline
      class="mb-3"
    >
      <template #tools>
        <small class="text-muted">{{ formatDateTime(msg.created_at) }}</small>
      </template>
      <p style="white-space: pre-wrap; margin: 0">{{ msg.body }}</p>
    </AdminCard>

    <AdminCard title="Send reply" outline>
      <form class="admin-form" @submit.prevent="sendReply">
        <div class="admin-field">
          <label>Message</label>
          <textarea v-model="replyForm.body" class="form-control" rows="4" required placeholder="Type your reply..." />
        </div>
        <button type="submit" class="btn-lte btn-lte-primary" :disabled="replyForm.processing">Send reply</button>
      </form>
    </AdminCard>
  </AdminLayout>
</template>
