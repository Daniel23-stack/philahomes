<script setup>
import { ref } from 'vue';
import axios from 'axios';

const open = ref(false);
const messages = ref([]);
const input = ref('');
const loading = ref(false);
const error = ref(null);

const WELCOME = "Hi! I'm the Okuhle Homes assistant. Ask about our services or how to get a quote.";

async function send() {
  const text = input.value.trim();
  if (!text || loading.value) return;
  input.value = '';
  error.value = null;
  const userMessage = { role: 'user', content: text };
  messages.value.push(userMessage);
  loading.value = true;
  try {
    const history = messages.value.map((m) => ({ role: m.role, content: m.content }));
    const { data } = await axios.post('/api/chat', { messages: history });
    messages.value.push({ role: 'assistant', content: data.message });
  } catch (e) {
    error.value = e.response?.data?.error || 'Something went wrong.';
    messages.value.push({
      role: 'assistant',
      content: "I'm having trouble right now. Please use the contact form or request a quote.",
    });
  } finally {
    loading.value = false;
  }
}

const display = () => (messages.value.length ? messages.value : [{ role: 'assistant', content: WELCOME }]);
</script>

<template>
  <button
    type="button"
    class="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-lg"
    :aria-label="open ? 'Close chat' : 'Open support chat'"
    @click="open = !open"
  >
    {{ open ? 'X' : 'Chat' }}
  </button>
  <div
    v-if="open"
    class="fixed bottom-24 right-6 z-40 flex h-[min(28rem,80vh)] w-full max-w-md flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
  >
    <div class="border-b bg-[var(--color-primary)] px-4 py-3 font-semibold text-white">Okuhle Homes Support</div>
    <div class="flex-1 space-y-4 overflow-y-auto p-4">
      <div
        v-for="(m, i) in display()"
        :key="i"
        class="flex"
        :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm"
          :class="m.role === 'user' ? 'bg-[var(--color-primary)] text-white' : 'bg-slate-100 text-slate-800'"
        >
          {{ m.content }}
        </div>
      </div>
      <p v-if="error" class="text-xs text-red-600">{{ error }}</p>
    </div>
    <form class="flex gap-2 border-t p-3" @submit.prevent="send">
      <input
        v-model="input"
        type="text"
        placeholder="Ask about services…"
        class="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm"
        :disabled="loading"
      />
      <button type="submit" class="rounded-lg bg-[var(--color-accent)] px-4 text-white" :disabled="loading || !input.trim()">
        Send
      </button>
    </form>
  </div>
</template>
