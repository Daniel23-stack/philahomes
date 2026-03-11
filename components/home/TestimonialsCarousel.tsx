'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: 'Professional from start to finish. Fixed our plumbing issue same day and the price was fair.',
    author: 'Sarah M.',
    location: 'Johannesburg',
    rating: 5,
  },
  {
    quote: 'Had our solar panels installed by PhilaHomes. Great communication and quality work.',
    author: 'James K.',
    location: 'Pretoria',
    rating: 5,
  },
  {
    quote: 'We use them for all our electrical and maintenance needs. Reliable and trustworthy.',
    author: 'Linda T.',
    location: 'Sandton',
    rating: 5,
  },
];

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)] opacity-0 animate-fade-in-up">
          Testimonials
        </p>
        <h2 className="mt-2 text-center text-3xl font-light text-slate-900 sm:text-4xl opacity-0 animate-fade-in-up animate-delay-200">
          What our customers say
        </h2>
        <div className="mt-14 flex flex-col items-center opacity-0 animate-fade-in-up animate-delay-300">
          <div key={index} className="flex min-h-[120px] flex-col items-center animate-fade-in-up">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < t.rating ? 'fill-[var(--color-highlight)] text-[var(--color-highlight)]' : 'text-slate-300'}`}
                />
              ))}
            </div>
            <blockquote className="mt-6 text-center text-lg leading-relaxed text-slate-800 sm:text-xl">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <p className="mt-4 text-base font-medium text-slate-900">
              — {t.author}, {t.location}
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="rounded-full p-2 text-slate-500 transition hover:scale-110 hover:bg-slate-200 hover:text-slate-900"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 w-2 rounded-full transition ${i === index ? 'bg-[var(--color-accent)]' : 'bg-slate-300'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="rounded-full p-2 text-slate-500 transition hover:scale-110 hover:bg-slate-200 hover:text-slate-900"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
