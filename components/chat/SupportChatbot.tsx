'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

const WELCOME =
  "Hi! I'm the PhilaHomes assistant. Ask me about our services (plumbing, electrical, renovations, solar, and more), how to get a quote, or anything else.";

export function SupportChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setError(null);
    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              "I'm having trouble right now. Please use the **Request a quote** or **Contact** form and we'll get back to you.",
          },
        ]);
        return;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch {
      setError('Network error.');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I couldn't connect. Please try the contact form or request a quote.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const displayMessages = messages.length === 0 ? [{ role: 'assistant' as const, content: WELCOME }] : messages;

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2"
        aria-label={open ? 'Close chat' : 'Open support chat'}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-40 flex h-[min(28rem,80vh)] w-full max-w-md flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-[var(--color-primary)] px-4 py-3 text-white">
            <MessageCircle className="h-5 w-5 shrink-0" />
            <span className="font-semibold">PhilaHomes Support</span>
          </div>

          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {displayMessages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === 'user'
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2.5">
                  <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                  <span className="text-sm text-slate-600">Thinking…</span>
                </div>
              </div>
            )}
            {error && (
              <p className="text-xs text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>

          <form
            className="flex gap-2 border-t border-slate-200 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services or get a quote…"
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)] text-white transition hover:opacity-90 disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
