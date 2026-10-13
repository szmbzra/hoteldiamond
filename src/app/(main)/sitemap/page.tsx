import sitemap from "@/app/sitemap";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Link from "next/link";
import { Metadata } from "next";
import { site, SITE_URL } from "@/config/site";

const CORE = { category: "Core Page", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };

const PAGES: Record<string, { title: string; icon: string }> = {
  "about-us": { title: "About Us", icon: "fa-circle-info" },
  "contact-us": { title: "Contact Us", icon: "fa-address-book" },
  gallery: { title: "Gallery", icon: "fa-images" },
  facilities: { title: "Facilities", icon: "fa-spa" },
  "virtual-tour": { title: "Virtual Tour", icon: "fa-street-view" },
  faq: { title: "FAQ", icon: "fa-circle-question" },
  reviews: { title: "Guest Reviews", icon: "fa-star" },
  "work-with-us": { title: "Work With Us", icon: "fa-briefcase" },
};

const SECTIONS: Record<string, { title: string; category: string; icon: string; color: string }> = {
  accommodations: { title: "Accommodations", category: "Accommodation", icon: "fa-bed", color: "bg-blue-50 text-blue-700 border-blue-200" },
  "meeting-events": { title: "Meetings & Events", category: "Events", icon: "fa-calendar-days", color: "bg-purple-50 text-purple-700 border-purple-200" },
  "dining-bar": { title: "Dining & Bar", category: "Dining", icon: "fa-utensils", color: "bg-orange-50 text-orange-700 border-orange-200" },
  offers: { title: "Offers & Packages", category: "Offers", icon: "fa-tag", color: "bg-rose-50 text-rose-700 border-rose-200" },
  blog: { title: "Blog", category: "Blog / News", icon: "fa-newspaper", color: "bg-amber-50 text-amber-700 border-amber-200" },
  service: { title: "Services", category: "Services", icon: "fa-concierge-bell", color: "bg-teal-50 text-teal-700 border-teal-200" },
};

// Statically prerendered otherwise, so new CMS slugs would never appear.
export const revalidate = 60;

export const metadata: Metadata = {
  title: `Sitemap | ${site.name}`,
  description: `A complete directory of all pages on the ${site.name} website.`,
};

export default async function SitemapPage() {
  const sitemapItems = await sitemap();

  // SITE_URL may carry a sub-path (e.g. https://host/hoteldiamond); strip the
  // whole thing so paths are relative to the app, not the domain.
  const toPath = (url: string) => url.replace(SITE_URL, "") || "/";

  const titleFromSlug = (slug: string) =>
    slug.split("-").filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const getPageDetails = (url: string) => {
    const pathname = toPath(url);
    const [section, ...rest] = pathname.split("/").filter(Boolean);
    const isDetail = rest.length > 0;

    if (!section) return { title: "Home", ...CORE, icon: "fa-house" };

    // Sections: one entry per route folder in src/app/(main). Any new
    // /<section>/[slug] page from the CMS is picked up automatically.
    const sec = SECTIONS[section];
    if (sec) {
      return {
        title: isDetail ? titleFromSlug(rest[rest.length - 1]) : sec.title,
        category: sec.category,
        icon: sec.icon,
        color: sec.color,
      };
    }

    // Static top-level pages
    const page = PAGES[section];
    if (page) return { title: page.title, ...CORE, icon: page.icon };

    // Anything else is a CMS article served at /[slug]
    return { title: titleFromSlug(section), category: "Information", icon: "fa-file-lines", color: "bg-slate-50 text-slate-700 border-slate-200" };
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 0.8) return "bg-red-50 text-red-700 border-red-200 font-semibold";
    if (priority >= 0.6) return "bg-yellow-50 text-yellow-700 border-yellow-200";
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  return (
    <main className="bg-slate-50 min-h-screen pb-16">
      <Breadcrumb
        title="Visual Sitemap"
        items={[{ label: "Home", href: "/" }, { label: "Sitemap" }]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-amber-900/5 to-transparent">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Site Directory & Index</h2>
              <p className="text-slate-500 text-sm mt-1">
                Showing {sitemapItems.length} pages indexed for search engines.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold">Core</span>
              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-bold">Accommodations</span>
              <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full font-bold">Events</span>
              <span className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full font-bold">Dining</span>
              <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-bold">Blog</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">Page Details</th>
                  <th className="px-6 py-4">Path</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Frequency</th>
                  <th className="px-6 py-4 text-center">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {sitemapItems.map((item, index) => {
                  const details = getPageDetails(item.url);
                  const relativePath = toPath(item.url);
                  const priorityVal = item.priority ?? 0.5;

                  return (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${details.color} shrink-0`}>
                            <i className={`fa-solid ${details.icon} text-sm`}></i>
                          </div>
                          <Link
                            href={relativePath}
                            className="font-semibold text-slate-800 hover:text-primary hover:underline transition-colors"
                          >
                            {details.title}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">
                        {relativePath}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-md border font-medium ${details.color}`}>
                          {details.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 capitalize">
                        {item.changeFrequency || "monthly"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block text-xs px-2.5 py-1 rounded-md border ${getPriorityColor(priorityVal)}`}>
                          {(priorityVal * 100).toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
