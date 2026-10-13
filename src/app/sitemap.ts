import { MetadataRoute } from 'next';
import { getBlogs, getSubpackages, getArticles, getServices, getOffers } from '@/lib/data';
import { CATEGORY_IDS, SITE_URL } from '@/config/site';

const BASE_URL = SITE_URL;

// sitemap.ts is cached by default, so a build-time fetch failure would freeze
// a static-only sitemap. Regenerate regularly so CMS content is picked up.
export const revalidate = 60;

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
    { url: `${BASE_URL}/accommodations`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/offers`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/meeting-events`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/dining-bar`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`,                lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/contact-us`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about-us`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/gallery`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/facilities`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/reviews`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${BASE_URL}/virtual-tour`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/work-with-us`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/faq`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // 2. Fetch dynamic content in parallel
  const [blogs, subpackages, articles, services, offers] = await Promise.all([
    getBlogs(),
    getSubpackages(),
    getArticles(),
    getServices(),
    getOffers(),
  ]);

  // fetchAPI swallows errors and returns null — surface that so an empty
  // dynamic section isn't mistaken for "no content".
  const sources = { blogs, subpackages, articles, services, offers };
  for (const [name, value] of Object.entries(sources)) {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      console.warn(`[sitemap] "${name}" returned no data; its URLs are missing from the sitemap`);
    }
  }

  const blogEntries: MetadataRoute.Sitemap = (blogs ?? []).filter(p => p.slug).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug.replace(/^\//, '')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Served at /offers/[slug]; the API returns an array or an id-keyed object.
  const offerList: any[] = Array.isArray(offers) ? offers : Object.values(offers || {});
  const offerEntries: MetadataRoute.Sitemap = offerList
    .filter(o => o?.slug)
    .map(o => ({
      url: `${BASE_URL}/offers/${String(o.slug).replace(/^\//, '')}`,
      lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8,
    }));

  // Prefixes match the route folders under src/app/(main)/.
  const roomEntries = extractSlugsByCategory(subpackages ?? [], CATEGORY_IDS.rooms, 'accommodations', 0.8, 'monthly');
  const eventEntries = extractSlugsByCategory(subpackages ?? [], CATEGORY_IDS.events, 'meeting-events', 0.7, 'weekly');
  const diningEntries = extractSlugsByCategory(subpackages ?? [], CATEGORY_IDS.restaurant, 'dining-bar', 0.7, 'monthly');

  // `services` is grouped by type: 1 = facility icons (no content, no page),
  // 2 = real services. A type-2 item with `linksrc` is a card pointing at its
  // own route (dining-bar, meeting-events, /experience), already covered above,
  // so only linksrc-less type-2 items get a /service/[slug] entry.
  const serviceEntries: MetadataRoute.Sitemap = [];
  for (const group of services ?? []) {
    if (group.type !== 2) continue;
    for (const item of group.items ?? []) {
      if (!item.slug || item.linksrc) continue;
      serviceEntries.push({
        url: `${BASE_URL}/service/${String(item.slug).replace(/^\//, '')}`,
        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6,
      });
    }
  }

  // `article_all` is a flat list served at /[slug]. about-us has its own
  // route (static above); homepage-about-us is a homepage block, not a page.
  const articleEntries: MetadataRoute.Sitemap = (articles ?? [])
    .filter(a => a.slug && a.slug !== 'homepage-about-us')
    .map(a => ({
      url: `${BASE_URL}/${String(a.slug).replace(/^\//, '')}`,
      lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6,
    }));

  // Deduplicate by URL — static entries win
  const seen = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of [...staticPages, ...roomEntries, ...offerEntries, ...eventEntries, ...blogEntries, ...diningEntries, ...serviceEntries, ...articleEntries]) {
    if (!seen.has(entry.url)) seen.set(entry.url, entry);
  }

  return Array.from(seen.values());
}
