<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import PublicLayout from '@/Layouts/PublicLayout.vue';
import NewsletterSection from '@/Components/NewsletterSection.vue';
import ScrollReveal from '@/Components/ScrollReveal.vue';
import SectionHeader from '@/Components/SectionHeader.vue';
import MotionCard from '@/Components/MotionCard.vue';

const props = defineProps({
  posts: { type: Array, default: () => [] },
  services: { type: Array, default: () => [] },
});

const HERO = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80';

const highlights = [
  { title: 'Licensed & insured', desc: 'Certified tradespeople for plumbing, electrical, and solar work.', icon: 'shield' },
  { title: 'Transparent pricing', desc: 'Clear quotes with no hidden fees before any work begins.', icon: 'tag' },
  { title: 'Johannesburg-wide', desc: 'Reliable service across the greater Johannesburg area.', icon: 'map' },
  { title: 'End-to-end support', desc: 'From quote to completion and follow-up maintenance.', icon: 'support' },
];

const stats = [
  { value: '500+', label: 'Projects completed' },
  { value: '8', label: 'Service categories' },
  { value: '24/7', label: 'Emergency support' },
  { value: '100%', label: 'Transparent quotes' },
];

const serviceImages = {
  plumbing: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80',
  electrical: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
  renovations: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  'interior-design': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
  bricklaying: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  'general-maintenance': 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80',
  welding: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
  solar: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
};

const steps = [
  { title: 'Tell us what you need', desc: 'Submit a quote request with your project details and preferred contact method.' },
  { title: 'Receive a tailored quote', desc: 'We review your request and send a clear, itemised estimate.' },
  { title: 'Schedule the job', desc: 'Accept the quote and we lock in a convenient date for the work.' },
  { title: 'Work done — follow-up', desc: 'Quality completion, invoicing, and ongoing support when you need it.' },
];

const portfolioItems = [
  { title: 'Kitchen renovation', category: 'Renovations', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80' },
  { title: 'Bathroom plumbing', category: 'Plumbing', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80' },
  { title: 'Solar PV install', category: 'Solar', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80' },
  { title: 'Electrical rewiring', category: 'Electrical', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80' },
  { title: 'Exterior painting', category: 'Maintenance', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80' },
  { title: 'Open-plan extension', category: 'Renovations', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
];

const contactForm = ref({ name: '', contact: '', query: '' });
const contactStatus = ref('idle');

const quoteForm = ref({
  serviceCategory: '',
  description: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
});
const quoteStatus = ref('idle');

async function submitContact() {
  contactStatus.value = 'sending';
  try {
    await axios.post('/api/contact', contactForm.value);
    contactStatus.value = 'sent';
    contactForm.value = { name: '', contact: '', query: '' };
  } catch {
    contactStatus.value = 'error';
  }
}

async function submitQuote() {
  quoteStatus.value = 'loading';
  try {
    await axios.post('/api/requests', quoteForm.value);
    quoteStatus.value = 'success';
    quoteForm.value = { serviceCategory: '', description: '', contactName: '', contactEmail: '', contactPhone: '' };
  } catch {
    quoteStatus.value = 'error';
  }
}

function scrollToHash() {
  const hash = window.location.hash;
  if (!hash) return;
  requestAnimationFrame(() => {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

onMounted(scrollToHash);
</script>

<template>
  <Head title="Home" />
  <PublicLayout>
    <!-- Hero -->
    <section id="home" class="relative min-h-screen overflow-hidden bg-slate-900">
      <img :src="HERO" alt="" class="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div class="hero-overlay absolute inset-0" />
      <div class="gradient-orb gradient-orb--accent -right-20 top-1/4 h-[28rem] w-[28rem] opacity-40" />
      <div class="gradient-orb gradient-orb--primary -left-32 bottom-1/4 h-80 w-80 opacity-30" />
      <div class="gradient-orb gradient-orb--gold right-1/3 top-1/3 h-64 w-64 opacity-25" />

      <div class="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 pb-24 pt-32 lg:justify-center lg:pb-32 lg:pt-24">
        <p class="hero-animate hero-animate-d1 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-highlight)]">
          Home services & renovations
        </p>
        <h1 class="hero-animate hero-animate-d2 mt-4 max-w-3xl text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl">
          Make every home inspiration
          <span class="font-semibold text-gradient"> a reality.</span>
        </h1>
        <p class="hero-animate hero-animate-d3 mt-6 max-w-xl text-lg text-slate-200">
          Complete home solutions — plumbing, electrical, renovations, and solar — delivered with precision across Johannesburg.
        </p>
        <div class="hero-animate hero-animate-d4 mt-10 flex flex-wrap gap-4">
          <a href="#services" class="btn-primary">Our services</a>
          <a href="#quote" class="btn-ghost-light">Request a quote</a>
        </div>
      </div>

      <!-- Scroll hint -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 float-slow">
        <div class="flex flex-col items-center gap-2 text-white/50">
          <span class="text-xs uppercase tracking-widest">Scroll</span>
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="relative z-10 -mt-12 pb-6">
      <div class="mx-auto max-w-7xl px-4">
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MotionCard
            v-for="(stat, i) in stats"
            :key="stat.label"
            variant="stat"
            animation="fade-up"
            :delay="i * 90"
            :tilt="false"
          >
            <p class="stat-value">{{ stat.value }}</p>
            <p class="mt-2 text-sm font-medium text-slate-500">{{ stat.label }}</p>
          </MotionCard>
        </div>
      </div>
    </section>

    <!-- Highlights -->
    <section class="section-bg-mesh section-pattern relative overflow-hidden pb-24 pt-8">
      <div class="gradient-orb gradient-orb--primary -left-24 top-0 h-72 w-72 opacity-25" />
      <div class="relative mx-auto max-w-7xl px-4">
        <ScrollReveal animation="fade-up">
          <SectionHeader
            title="Why Okuhle Homes?"
            subtitle="Trusted home services with quality workmanship and honest communication."
          />
        </ScrollReveal>
        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MotionCard
            v-for="(item, i) in highlights"
            :key="item.title"
            variant="feature"
            animation="fade-up"
            :delay="i * 90"
          >
            <div class="motion-card__icon">
              <svg v-if="item.icon === 'shield'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <svg v-else-if="item.icon === 'tag'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
              <svg v-else-if="item.icon === 'map'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div class="mt-4 flex-1">
              <h3 class="font-semibold text-[var(--color-primary)]">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-500">{{ item.desc }}</p>
            </div>
          </MotionCard>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="scroll-mt-24 relative overflow-hidden bg-white py-24">
      <div class="gradient-orb gradient-orb--gold -right-32 top-1/2 h-96 w-96 -translate-y-1/2 opacity-20" />
      <div class="mx-auto max-w-7xl px-4">
        <div class="grid items-center gap-14 lg:grid-cols-2">
          <ScrollReveal animation="slide-right">
            <div class="relative">
              <div class="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[var(--color-accent)]/20 via-transparent to-[var(--color-primary)]/20" />
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80"
                alt="Okuhle Homes team at work"
                class="relative rounded-2xl shadow-2xl shadow-slate-900/10"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal animation="slide-left" :delay="150">
            <SectionHeader
              label="About us"
              title="Building better homes in Johannesburg"
              align="left"
            />
            <p class="mt-6 text-slate-700">
              Okuhle Homes is a Johannesburg-based company offering plumbing, electrical, renovations, interior design, and solar solutions. We combine skilled tradespeople with transparent pricing and reliable project delivery.
            </p>
            <p class="mt-4 text-slate-700">
              Whether you need an emergency leak repair, a full kitchen remodel, or a solar installation, our team manages every step — from the first quote to the final handover.
            </p>
            <a href="#contact" class="btn-primary mt-8 inline-flex">Get in touch</a>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="scroll-mt-24 section-bg-warm section-pattern relative overflow-hidden py-24">
      <div class="gradient-orb gradient-orb--accent right-0 top-20 h-80 w-80 opacity-20" />
      <div class="relative mx-auto max-w-7xl px-4">
        <ScrollReveal animation="fade-up">
          <SectionHeader
            label="What we do"
            title="Our services"
            subtitle="From everyday repairs to full-scale renovations and solar installations."
          />
        </ScrollReveal>
        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <MotionCard
            v-for="(s, i) in services"
            :key="s.slug"
            variant="service"
            animation="fade-up"
            :delay="(i % 3) * 90"
          >
            <div class="service-card__img-wrap">
              <img :src="serviceImages[s.slug]" :alt="s.name" loading="lazy" />
            </div>
            <div class="motion-card__body">
              <div class="motion-card__bar" />
              <h3 class="text-base font-semibold text-[var(--color-primary)]">{{ s.name }}</h3>
              <p class="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">{{ s.shortDescription }}</p>
              <ul v-if="s.subcategories?.length" class="mt-3 flex flex-wrap gap-1.5">
                <li
                  v-for="sub in s.subcategories.slice(0, 3)"
                  :key="sub.id"
                  class="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                >
                  {{ sub.name }}
                </li>
              </ul>
              <a href="#quote" class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline">
                Get a quote →
              </a>
            </div>
          </MotionCard>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section id="how-it-works" class="scroll-mt-24 section-bg-light relative overflow-hidden py-24">
      <div class="gradient-orb gradient-orb--primary left-1/4 top-0 h-64 w-64 opacity-20" />
      <div class="relative mx-auto max-w-7xl px-4">
        <ScrollReveal animation="fade-up">
          <SectionHeader label="Simple process" title="How it works" />
        </ScrollReveal>
        <div class="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <MotionCard
            v-for="(step, i) in steps"
            :key="step.title"
            variant="step"
            animation="fade-up"
            :delay="i * 100"
            :step="i + 1"
          >
            <h3 class="font-semibold text-[var(--color-primary)]">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ step.desc }}</p>
          </MotionCard>
        </div>
      </div>
    </section>

    <!-- Portfolio -->
    <section id="portfolio" class="scroll-mt-24 section-bg-dark relative overflow-hidden py-24 text-white">
      <div class="gradient-orb gradient-orb--accent left-1/2 top-0 h-96 w-96 -translate-x-1/2 opacity-20" />
      <div class="gradient-orb gradient-orb--gold -right-20 bottom-0 h-72 w-72 opacity-15" />
      <div class="relative mx-auto max-w-7xl px-4">
        <ScrollReveal animation="fade-up">
          <SectionHeader
            label="Our work"
            title="Recent projects"
            subtitle="A snapshot of plumbing, electrical, renovation, and solar work across Johannesburg."
            dark
          />
        </ScrollReveal>
        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <MotionCard
            v-for="(item, i) in portfolioItems"
            :key="item.title"
            variant="image"
            animation="fade-up"
            :delay="(i % 3) * 90"
            :tilt="false"
          >
            <div class="portfolio-card__img">
              <img :src="item.image" :alt="item.title" loading="lazy" />
            </div>
            <div class="portfolio-card__footer">
              <p class="text-xs font-semibold uppercase tracking-wider text-[var(--color-highlight)]">{{ item.category }}</p>
              <h3 class="mt-1 font-medium text-white">{{ item.title }}</h3>
            </div>
          </MotionCard>
        </div>
      </div>
    </section>

    <!-- Blog -->
    <section id="blog" class="scroll-mt-24 relative overflow-hidden bg-white py-24">
      <div class="gradient-orb gradient-orb--primary -left-20 bottom-0 h-72 w-72 opacity-15" />
      <div class="relative mx-auto max-w-7xl px-4">
        <ScrollReveal animation="fade-up">
          <SectionHeader label="Insights" title="Latest from the blog" />
        </ScrollReveal>
        <div v-if="posts.length" class="mt-14 grid gap-8 md:grid-cols-3">
          <MotionCard
            v-for="(post, i) in posts"
            :key="post.slug"
            variant="blog"
            animation="fade-up"
            :delay="i * 90"
          >
            <div class="motion-card__bar" />
            <Link :href="`/blog/${post.slug}`" class="text-base font-semibold leading-snug text-[var(--color-primary)] transition-colors hover:text-[var(--color-accent)]">
              {{ post.title }}
            </Link>
            <p v-if="post.excerpt" class="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{{ post.excerpt }}</p>
            <Link :href="`/blog/${post.slug}`" class="mt-4 inline-flex text-sm font-medium text-[var(--color-accent)] hover:underline">
              Read more →
            </Link>
          </MotionCard>
        </div>
        <ScrollReveal v-else animation="fade-up" class="mt-14">
          <div class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center text-slate-500">
            Blog posts coming soon — check back for tips, news, and project highlights.
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- Quote -->
    <section id="quote" class="scroll-mt-24 section-bg-warm relative overflow-hidden py-24">
      <div class="gradient-orb gradient-orb--accent -right-24 top-1/2 h-80 w-80 -translate-y-1/2 opacity-20" />
      <div class="relative mx-auto max-w-2xl px-4">
        <ScrollReveal animation="fade-up">
          <SectionHeader
            label="Free estimate"
            title="Request a quote"
            subtitle="Tell us about your project and we'll get back to you with a tailored estimate."
          />
        </ScrollReveal>
        <ScrollReveal animation="fade-up" :delay="150">
          <form class="form-card mt-10 space-y-4" @submit.prevent="submitQuote">
            <div>
              <label class="block text-sm font-medium text-gray-700">Service</label>
              <select v-model="quoteForm.serviceCategory" required class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5">
                <option value="">Select a service</option>
                <option v-for="s in services" :key="s.slug" :value="s.slug">{{ s.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Project description</label>
              <textarea v-model="quoteForm.description" required rows="4" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5" placeholder="Describe what you need done…" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Your name</label>
              <input v-model="quoteForm.contactName" required class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5" />
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input v-model="quoteForm.contactEmail" type="email" required class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Phone (optional)</label>
                <input v-model="quoteForm.contactPhone" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5" />
              </div>
            </div>
            <p v-if="quoteStatus === 'success'" class="text-sm text-green-600">Request submitted. We'll be in touch soon.</p>
            <p v-if="quoteStatus === 'error'" class="text-sm text-red-600">Something went wrong. Please try again.</p>
            <button type="submit" class="btn-primary w-full" :disabled="quoteStatus === 'loading'">
              {{ quoteStatus === 'loading' ? 'Submitting…' : 'Submit request' }}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="scroll-mt-24 section-bg-light relative overflow-hidden py-24">
      <div class="gradient-orb gradient-orb--gold -left-32 top-1/3 h-80 w-80 opacity-20" />
      <div class="relative mx-auto max-w-7xl px-4">
        <div class="grid gap-14 lg:grid-cols-2">
          <ScrollReveal animation="slide-right">
            <SectionHeader
              label="Contact"
              title="Let's talk about your project"
              subtitle="Send us a message and we'll respond as soon as possible."
              align="left"
            />
            <div class="mt-8 space-y-3">
              <div class="info-card">
                <div class="info-card__icon">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Phone</p>
                  <a href="tel:+27677103452" class="mt-0.5 block text-base font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)]">+27 67 710 3452</a>
                </div>
              </div>
              <div class="info-card">
                <div class="info-card__icon">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</p>
                  <a href="mailto:info@philahomes.co.za" class="mt-0.5 block text-base font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)]">info@philahomes.co.za</a>
                </div>
              </div>
              <div class="info-card">
                <div class="info-card__icon">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Location</p>
                  <p class="mt-0.5 text-base font-medium text-[var(--color-primary)]">Johannesburg, South Africa</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="slide-left" :delay="150">
            <form class="form-card space-y-4" @submit.prevent="submitContact">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input v-model="contactForm.name" required class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email or phone</label>
                <input v-model="contactForm.contact" required class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Message</label>
                <textarea v-model="contactForm.query" required rows="4" class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5" />
              </div>
              <p v-if="contactStatus === 'sent'" class="text-sm text-green-600">Thank you. We will get back to you soon.</p>
              <p v-if="contactStatus === 'error'" class="text-sm text-red-600">Something went wrong. Please try again.</p>
              <button type="submit" class="btn-primary w-full" :disabled="contactStatus === 'sending'">
                {{ contactStatus === 'sending' ? 'Sending…' : 'Send inquiry' }}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <NewsletterSection />
  </PublicLayout>
</template>
