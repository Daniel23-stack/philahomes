import { MetadataRoute } from 'next';
import { getAllServiceSlugs } from '@/data/services';

const BASE = process.env.NEXTAUTH_URL || 'https://philahomes.co.za';

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllServiceSlugs();
  const serviceUrls = slugs.map((slug) => ({
    url: `${BASE}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/how-it-works`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/request-quote`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...serviceUrls,
  ];
}
