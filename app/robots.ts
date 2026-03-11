import { MetadataRoute } from 'next';

const BASE = process.env.NEXTAUTH_URL || 'https://philahomes.co.za';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/dashboard/', '/admin/', '/api/'] },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
