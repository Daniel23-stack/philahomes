'use client';

import { useState } from 'react';
import { SERVICES } from '@/data/services';

export function QuoteRequestForm() {
  const [serviceSlug, setServiceSlug] = useState('');
  const [subService, setSubService] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const service = SERVICES.find((s) => s.slug === serviceSlug);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        body: JSON.stringify({
          serviceCategory: formData.get('serviceCategory'),
          subService: formData.get('subService') || undefined,
          description: formData.get('description'),
          contactName: formData.get('contactName'),
          contactEmail: formData.get('contactEmail'),
          contactPhone: formData.get('contactPhone') || undefined,
          imageUrls: imageUrls.length ? imageUrls : undefined,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
        setServiceSlug('');
        setSubService('');
        setImageUrls([]);
      } else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) formData.append('files', files[i]);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.urls?.length) setImageUrls((prev) => [...prev, ...data.urls]);
    } catch {
      // ignore upload error for now
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="serviceCategory" className="block text-sm font-medium text-gray-700">
          Service *
        </label>
        <select
          id="serviceCategory"
          name="serviceCategory"
          required
          value={serviceSlug}
          onChange={(e) => {
            setServiceSlug(e.target.value);
            setSubService('');
          }}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
        >
          <option value="">Select a service</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {service && service.subcategories.length > 0 && (
        <div>
          <label htmlFor="subService" className="block text-sm font-medium text-gray-700">
            Sub-service (optional)
          </label>
          <select
            id="subService"
            name="subService"
            value={subService}
            onChange={(e) => setSubService(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          >
            <option value="">Select if applicable</option>
            {service.subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          placeholder="Describe the work you need..."
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Photos (optional)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--color-primary)] file:px-4 file:py-2 file:text-white file:hover:opacity-90"
        />
        {imageUrls.length > 0 && (
          <p className="mt-1 text-sm text-gray-500">{imageUrls.length} image(s) attached</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
          Phone (optional)
        </label>
        <input
          id="contactPhone"
          name="contactPhone"
          type="tel"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
        />
      </div>

      {status === 'sent' && (
        <p className="text-sm text-green-600">Thank you. We&apos;ll send you a quote soon.</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again or call us.</p>
      )}
      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full">
        {status === 'sending' ? 'Sending…' : 'Submit request'}
      </button>
    </form>
  );
}
