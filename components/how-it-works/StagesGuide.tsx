import { FileText, Wrench, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: '1. Request a quote',
    description: 'Tell us what you need via our form. We’ll review and send you a quote.',
  },
  {
    icon: Wrench,
    title: '2. Service delivery',
    description: 'Once you approve the quote, we schedule the work and keep you updated until completion.',
  },
  {
    icon: CreditCard,
    title: '3. Payment',
    description: 'Pay by invoice — we support card, EFT, and other convenient options.',
  },
];

export function StagesGuide() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map((step) => (
        <div key={step.title} className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
            <step.icon className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-[var(--color-primary)]">{step.title}</h3>
          <p className="mt-2 text-gray-600">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
