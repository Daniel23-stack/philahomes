'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  id: string;
};

export function PasswordInput({ id, className = '', autoComplete, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative mt-1">
      <input
        {...props}
        id={id}
        type={visible ? 'text' : 'password'}
        autoComplete={autoComplete ?? 'current-password'}
        className={`block w-full rounded-lg border border-gray-300 py-2 pl-3 pr-10 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] ${className}`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
      >
        {visible ? <EyeOff className="h-5 w-5" aria-hidden /> : <Eye className="h-5 w-5" aria-hidden />}
      </button>
    </div>
  );
}
