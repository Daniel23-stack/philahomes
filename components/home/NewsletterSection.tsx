'use client';

import { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    // Placeholder: no backend yet; show success for UX
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  }

  return (
    <section className="border-t border-slate-200 bg-[var(--color-primary)] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-highlight)] opacity-0 animate-fade-in-up">
          Stay in touch
        </p>
        <h2 className="mt-2 text-3xl font-light sm:text-4xl opacity-0 animate-fade-in-up animate-delay-200">
          Subscribe to our newsletter
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-200 opacity-0 animate-fade-in-up animate-delay-300">
          Get updates on offers, tips, and news from PhilaHomes.
        </p>
        {/* No opacity/enter animation on <form> — it caused hydration mismatches with the submit button */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={status === 'loading'}
            className="min-w-0 flex-1 rounded border border-white/30 bg-white/10 px-4 py-3.5 text-white placeholder:text-slate-400 focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded bg-[var(--color-accent)] px-6 py-3.5 font-medium text-white transition hover:scale-[1.02] hover:opacity-95 disabled:opacity-70"
          >
            {status === 'loading' ? 'Subscribing…' : status === 'success' ? 'Subscribed' : 'Subscribe'}
          </button>
        </form>
        {status === 'success' && (
          <p className="mt-3 text-sm text-[var(--color-highlight)]">
            Thanks for subscribing. We&apos;ll be in touch.
          </p>
        )}
      </div>
    </section>
  );
}
