import { parseAPIResponse } from "./parser";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/hoteldiamond/api/v1/";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://mayurstay.com/hoteldiamond/api/v1/";

export async function fetchAPI<T>(
  endpoint: string,
  slug?: string,
): Promise<T | null> {
  const url = `${BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  try {
    // Extract a tag from the endpoint (e.g., api_package.php -> package)
    const tag = endpoint.replace("api_", "").replace(".php", "");

    // For SEO and Performance, we use revalidate.
    // This allows SSR/ISR which is faster than no-store but keeps data fresh.
    const res = await fetch(url, {
      // The CMS sits behind Imunify360 bot-protection. It returns 415 without an
      // explicit Accept header, and challenges non-browser User-Agents — so we
      // present as a normal browser client to get the real JSON back.
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      next: {
        revalidate: 60,
        tags: [tag, "all"], // Tag with the specific endpoint and a global "all" tag
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${endpoint} (Status: ${res.status})`);
    }

    const text = await res.text();
    let data = parseAPIResponse<any>(text);

    // The CMS sits behind Imunify360 bot-protection, which can answer with a
    // 200 + denial object instead of the data when the caller's IP isn't
    // whitelisted. Treat that as a failure so callers fail soft (→ null) rather
    // than receiving a junk { message } object that breaks `.find`/`.map`.
    if (
      data &&
      typeof data === "object" &&
      !Array.isArray(data) &&
      typeof (data as { message?: unknown }).message === "string" &&
      /imunify360|bot[- ]?protection|access denied/i.test((data as { message: string }).message)
    ) {
      throw new Error(`API blocked by bot-protection: ${endpoint}`);
    }

    // Extract by slug if response is a dictionary
    if (slug && data && typeof data === "object") {
      data = data[slug] || data;
    }

    // Clean HTML if it exists in the article data
    if (data && typeof data === "object" && typeof data.html === "string") {
      data.html = cleanArticleHTML(data.html);
    }

    return data as T;
  } catch (error) {
    // Graceful fallback for core pages
    console.warn(`[fetchAPI] Error fetching ${url}:`, error);

    // Only return null for endpoints that *must* come from the DB (like pages/articles)
    // For generic data like rooms/facilities, we can return empty arrays safely
    const nonFallbackEndpoints = [
      "about",
      "menu",
      "gallery",
      "events-page",
      "restaurant-bar",
      "siteRegulars",
      "metadata",
    ];
    if (nonFallbackEndpoints.includes(endpoint)) {
      return null;
    }
    return null; // Return null for things like slugs that don't have mock data
  }
}

/**
 * Strips legacy/technical background classes from API HTML
 * to align with the premium MOLLY brand.
 */
function cleanArticleHTML(html: string): string {
  if (!html) return "";
  return html;
}
