import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://codepath-tan.vercel.app';
  const langs = ['python', 'javascript', 'typescript', 'java', 'c', 'sql', 'rust'];

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/courses`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/learn`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...langs.map(lang => ({
      url: `${base}/courses/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...langs.map(lang => ({
      url: `${base}/learn/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${base}/auth/login`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/auth/signup`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ];
}
