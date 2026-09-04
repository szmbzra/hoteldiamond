import sitemap from "@/app/sitemap";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Link from "next/link";
import { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Sitemap | ${site.name}`,
  description: `A complete directory of all pages on the ${site.name} website.`,
};

export default async function SitemapPage() {
  const sitemapItems = await sitemap();

  const getPageDetails = (url: string) => {
    const pathname = url.replace(/https?:\/\/[^\/]+/, "");

    if (pathname === "/" || pathname === "") {
      return { title: "Home", category: "Core Page", icon: "fa-house", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    }
    if (pathname === "/about") {
      return { title: "About Us", category: "Core Page", icon: "fa-circle-info", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    }
    if (pathname === "/contact-us") {
      return { title: "Contact Us", category: "Core Page", icon: "fa-address-book", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    }
    if (pathname === "/gallery") {
      return { title: "Gallery", category: "Core Page", icon: "fa-images", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    }
    if (pathname === "/facilities") {
      return { title: "Facilities", category: "Core Page", icon: "fa-spa", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    }
    if (pathname === "/virtual-tour") {
      return { title: "Virtual Tour", category: "Core Page", icon: "fa-street-view", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    }
    if (pathname === "/faq") {
      return { title: "FAQ", category: "Core Page", icon: "fa-circle-question", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    }
    if (pathname === "/reviews") {
      return { title: "Guest Reviews", category: "Core Page", icon: "fa-star", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    }

    if (pathname === "/rooms") {
      return { title: "Rooms & Suites", category: "Accommodation", icon: "fa-bed", color: "bg-blue-50 text-blue-700 border-blue-200" };
    }
    if (pathname.startsWith("/rooms/")) {
      const slug = pathname.replace("/rooms/", "");
      const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      return { title, category: "Accommodation", icon: "fa-bed", color: "bg-blue-50 text-blue-700 border-blue-200" };
    }

    if (pathname === "/events") {
      return { title: "Events & Venues", category: "Events", icon: "fa-calendar-days", color: "bg-purple-50 text-purple-700 border-purple-200" };
    }
    if (pathname.startsWith("/events/")) {
      const slug = pathname.replace("/events/", "");
      const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      return { title, category: "Events", icon: "fa-calendar-days", color: "bg-purple-50 text-purple-700 border-purple-200" };
    }

    if (pathname === "/restaurant") {
      return { title: "Restaurant & Dining", category: "Dining", icon: "fa-utensils", color: "bg-orange-50 text-orange-700 border-orange-200" };
    }
    if (pathname.startsWith("/restaurant/")) {
      const slug = pathname.replace("/restaurant/", "");
      const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      return { title, category: "Dining", icon: "fa-utensils", color: "bg-orange-50 text-orange-700 border-orange-200" };
    }

    if (pathname === "/offers") {
      return { title: "Offers & Packages", category: "Offers", icon: "fa-tag", color: "bg-rose-50 text-rose-700 border-rose-200" };
    }

    if (pathname === "/blog") {
      return { title: "Blog", category: "Blog / News", icon: "fa-newspaper", color: "bg-amber-50 text-amber-700 border-amber-200" };
    }
    if (pathname.startsWith("/blog/")) {
      const slug = pathname.replace("/blog/", "");
      const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      return { title, category: "Blog / News", icon: "fa-newspaper", color: "bg-amber-50 text-amber-700 border-amber-200" };
    }

    if (pathname.startsWith("/service/")) {
      const slug = pathname.replace("/service/", "");
      const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      return { title, category: "Services", icon: "fa-concierge-bell", color: "bg-teal-50 text-teal-700 border-teal-200" };
    }

    const fallbackTitle = pathname
      .split("/")
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return { title: fallbackTitle || "Page", category: "General", icon: "fa-link", color: "bg-slate-50 text-slate-700 border-slate-200" };
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
              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-bold">Rooms</span>
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
                  const relativePath = item.url.replace(/https?:\/\/[^\/]+/, "") || "/";
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
