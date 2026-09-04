import { MetadataRoute } from 'next';
import { getBlogs, getSubpackages, getArticles, getServices } from '@/lib/data';
import { CATEGORY_IDS, SITE_URL } from '@/config/site';

const BASE_URL = SITE_URL;

interface CmsCategory {
  parent_id?: string | number;
  items?: { slug?: string }[];
}

function extractSlugsByCategory(
  data: CmsCategory[],
  categoryId: string,
  pathPrefix: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
): MetadataRoute.Sitemap {
  if (!Array.isArray(data)) return [];
  const category = data.find(c => String(c.parent_id) === categoryId);
  if (!category?.items) return [];
  return category.items
    .filter(item => item.slug)
    .map(item => ({
      url: `${BASE_URL}/${pathPrefix}/${item.slug!.replace(/^\//, '')}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static pages — ordered by crawl priority
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                          lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/rooms`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/offers`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/events`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/restaurant`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/contact-us`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/gallery`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/facilities`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/reviews`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${BASE_URL}/virtual-tour`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/faq`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // 2. Fetch dynamic content in parallel
  const [blogs, subpackages, articles, services] = await Promise.all([
    getBlogs(),
    getSubpackages(),
    getArticles(),
    getServices(),
  ]);

  const blogEntries: MetadataRoute.Sitemap = (blogs ?? []).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const roomEntries = extractSlugsByCategory(subpackages ?? [], CATEGORY_IDS.rooms, 'rooms', 0.8, 'monthly');
  const eventEntries = extractSlugsByCategory(subpackages ?? [], CATEGORY_IDS.events, 'events', 0.7, 'weekly');

  // Restaurant and service items live in articles/services (flat structure)
  const restaurantEntries: MetadataRoute.Sitemap = [];
  const serviceEntries: MetadataRoute.Sitemap = [];

  for (const source of [...(articles ?? []), ...(services ?? [])]) {
    if (!source.items) continue;
    for (const item of source.items) {
      if (!item.slug) continue;
      const slug = item.slug.replace(/^\//, '');
      if (slug.startsWith('restaurant/')) {
        restaurantEntries.push({ url: `${BASE_URL}/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 });
      } else {
        serviceEntries.push({ url: `${BASE_URL}/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 });
      }
    }
  }

  // Deduplicate by URL — static entries win
  const seen = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of [...staticPages, ...roomEntries, ...eventEntries, ...blogEntries, ...restaurantEntries, ...serviceEntries]) {
    if (!seen.has(entry.url)) seen.set(entry.url, entry);
  }

  return Array.from(seen.values());
}
