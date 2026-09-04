// Data-access layer — the only module that talks to fetchAPI besides api.ts
// itself. Pages/components never import fetchAPI directly; they call the named
// helpers below, which own all endpoint names, response-shape quirks and
// filtering. Changing where data comes from is an api.ts/env concern; changing
// what a page receives is a change here.

import { fetchAPI } from "./api";
import type { Landmark, MenuContainer, NavItem, NewsData } from "@/types";
import type { SiteMetadata } from "@/types/metadata";

// ── Site-wide ────────────────────────────────────────────────────────────────

export function getSiteRegulars(): Promise<any | null> {
  return fetchAPI<any>("siteregulars");
}

/** Site-wide CSS for CMS rich-text blocks (until `siteregulars` exposes it). */
export function getCustomCss(): Promise<any | null> {
  return fetchAPI<any>("css");
}

/**
 * The `metadata` endpoint (site/home/pages meta blocks).
 * Falls back to an empty object so all consumers degrade gracefully.
 */
export async function getSiteMetadata(): Promise<SiteMetadata> {
  try {
    const data = await fetchAPI<SiteMetadata>("metadata");
    return data ?? {};
  } catch {
    return {};
  }
}

/** Raw CMS `schema` entries (JSON-LD blocks); [] when unavailable. */
export async function getCmsSchemaEntries<T = any>(): Promise<T[]> {
  try {
    const data = await fetchAPI<T[]>("schema");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** One `schema` entry by its CMS `slug` (carries `image`/`fb_upload`, meta fields, JSON-LD), or null. */
export async function findSchemaEntryBySlug(slug: string): Promise<any | null> {
  const entries = await getCmsSchemaEntries();
  return entries.find((entry: any) => entry.slug === slug) ?? null;
}

// ── Navigation & social ──────────────────────────────────────────────────────

/** Menu items for one container: type 1 = header nav, type 2 = footer nav. */
export async function getMenuItems(type: number): Promise<NavItem[]> {
  const menu = (await fetchAPI<MenuContainer[]>("menu")) || [];
  return menu.find((item) => Number(item.type) === type)?.items || [];
}

/** Social-link group: type 1 = footer icons, type 2 = partner/OTA logos. */
export async function getSocialGroup(type: number): Promise<any | null> {
  const social = await fetchAPI<any[]>("social");
  return social?.find((item: any) => Number(item.type) === type) ?? null;
}

// ── Packages & categories (rooms / events / restaurant) ─────────────────────
// Parent-category ids live in CATEGORY_IDS (src/config/site.ts).

/** Parent-category record from `package` (banner, description, meta, faq). */
export async function getPackage(id: string): Promise<any | null> {
  const packages = await fetchAPI<any[]>("package");
  return packages?.find((p) => String(p.id) === id) ?? null;
}

/** Raw `subpackage` response — only for consumers that scan every category. */
export function getSubpackages(): Promise<any[] | null> {
  return fetchAPI<any[]>("subpackage");
}

/** Items (rooms/venues/outlets) of one `subpackage` category. */
export async function getCategoryItems(parentId: string): Promise<any[]> {
  const subpackage = await getSubpackages();
    if (!Array.isArray(subpackage)) return [];
  const category = subpackage?.find(
    (c: any) => String(c.parent_id) === parentId,
  );
  return category?.items ?? [];
}

export async function findCategoryItem(
  parentId: string,
  slug: string,
): Promise<any | null> {
  const items = await getCategoryItems(parentId);
  return items.find((item: any) => item.slug === slug) ?? null;
}

// ── CMS articles (`article_all`) ─────────────────────────────────────────────

export function getArticles(): Promise<any[] | null> {
  return fetchAPI<any[]>("article_all");
}

export async function findArticleBySlug(slug: string): Promise<any | null> {
  const articles = await getArticles();
  return articles?.find((item: any) => item.slug === slug) ?? null;
}

/**
 * Hero/breadcrumb background for a static page. The `article_all` type-2
 * category holds one item per page slug whose first gallery image is the
 * banner; falls back to the CMS-wide default image from `siteregulars`.
 */
export async function getPageHeroImage(
  pageSlug: string,
): Promise<string | undefined> {
  const [articles, siteRegulars] = await Promise.all([
    getArticles(),
    getSiteRegulars(),
  ]);
  const category = Array.isArray(articles)
    ? articles.find((item: any) => item.type === "2")
    : null;
  const item = category?.items?.find((i: any) => i.slug === pageSlug);
  return item?.gallery_images?.[0]?.src || siteRegulars?.default;
}

// ── Home articles (`homeArticle`) ────────────────────────────────────────────

export function getHomeArticles(): Promise<any | null> {
  return fetchAPI<any>("homeArticle");
}

// `homeArticle` records don't carry a real `id` column — the CMS instead
// tags each record's placement via a `homepage` field (e.g. "1", "20", "30"),
// which is what these numeric ids actually refer to.
/** `homeArticle` may arrive as an array or a keyed object — find by placement id. */
export async function getHomeArticleById(id: number): Promise<any | null> {
  const data = await getHomeArticles();
  const items: any[] = Array.isArray(data) ? data : Object.values(data || {});
  return items.find((item: any) => Number(item?.homepage) === id) ?? null;
}

// ── Blog ─────────────────────────────────────────────────────────────────────

export async function getBlogs(): Promise<NewsData[]> {
  return (await fetchAPI<NewsData[]>("blog")) || [];
}

/** Robust slug match — tolerates leading slashes and nested CMS slugs. */
export function findBlogIndex(blogs: NewsData[], slug: string): number {
  return blogs.findIndex((b) => {
    const cleanSlug = b.slug.startsWith("/") ? b.slug.slice(1) : b.slug;
    const targetSlug = slug.startsWith("/") ? slug.slice(1) : slug;
    return cleanSlug === targetSlug || cleanSlug.endsWith(`/${targetSlug}`);
  });
}

export async function findBlogBySlug(slug: string): Promise<NewsData | null> {
  const blogs = await getBlogs();
  const index = findBlogIndex(blogs, slug);
  return index === -1 ? null : blogs[index];
}

// ── Services / facilities ────────────────────────────────────────────────────

/** `services` grouped by category; type 1 = facilities, type 2 = services. */
export function getServices(type?: 1 | 2): Promise<any[] | null> {
  return fetchAPI<any[]>(type ? `services?type=${type}` : "services");
}

// `services` may come back grouped into categories ({ items: [...] }) or as a
// flat list — check both shapes since the CMS doesn't guarantee one or the other.
export async function findServiceBySlug(slug: string): Promise<any | null> {
  const services = await getServices();
  if (!Array.isArray(services)) return null;

  for (const entry of services) {
    if (Array.isArray(entry?.items)) {
      const match = entry.items.find((item: any) => item.slug === slug);
      if (match) return match;
    } else if (entry?.slug === slug) {
      return entry;
    }
  }
  return null;
}

// ── Simple endpoints ─────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<any[]> {
  const data = await fetchAPI<any[]>("testimonial");
  return Array.isArray(data) ? data : [];
}

export async function getFaqs(): Promise<{ question: string; answer: string }[]> {
  const data = await fetchAPI<{ question: string; answer: string }[]>("faq");
  return Array.isArray(data) ? data : [];
}

/** Images of one gallery group, selected by its CMS `display` label. */
export async function getGalleryImages(display = "Inner Page"): Promise<any[]> {
  const data = await fetchAPI<any>("gallery");
  const group = Array.isArray(data)
    ? data.find((gallery: any) => gallery.display === display)
    : null;
  return group?.items || [];
}

export function getOffers(): Promise<any | null> {
  return fetchAPI<any>("offers");
}

export async function findOfferBySlug(slug: string): Promise<any | null> {
  const data = await getOffers();
  const items: any[] = Array.isArray(data) ? data : Object.values(data || {});
  return items.find((item: any) => item?.slug === slug) ?? null;
}

export function getVirtualTour<T = any>(): Promise<T | null> {
  return fetchAPI<T>("virtual_tour");
}

export interface DealOfTheDay {
  id?: string;
  title?: string;
  whatsapp_message?: string;
  slug?: string;
  dod_date?: string;
  /** "1" = email enquiry, "2" = WhatsApp enquiry. */
  type?: string;
  mail?: string;
  whatsapp?: string;
  image?: string;
}

export function getDealOfTheDay(): Promise<DealOfTheDay | null> {
  return fetchAPI<DealOfTheDay>("dod");
}

export async function getSlideshow(): Promise<any> {
  return (await fetchAPI<any>("slideshow")) || [];
}

export async function getNearbyLandmarks(): Promise<Landmark[]> {
  return (await fetchAPI<Landmark[]>("nearby")) || [];
}

/** `popup` arrives in several wrapper shapes; normalise to a flat array. */
export async function getPopupItems(): Promise<any[]> {
  try {
    const data = await fetchAPI<any>("popup");
    if (Array.isArray(data)) return data;
    if (data?.data && Array.isArray(data.data)) return data.data;
    if (data?.items && Array.isArray(data.items)) return data.items;
    if (data && typeof data === "object") return [data];
  } catch (err) {
    console.error("Failed to fetch popup data", err);
  }
  return [];
}
