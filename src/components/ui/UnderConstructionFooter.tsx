import Image from "next/image";
import { getSiteRegulars, getSocialGroup } from "@/lib/data";

interface SocialLinkItem {
  url?: string;
  title?: string;
  icon?: string;
  image?: string;
}

export default async function UnderConstructionFooter() {
  const [site, socialLinks] = await Promise.all([
    getSiteRegulars(),
    getSocialGroup(1),
  ]);

  return (
    <footer>
      <div className="bg-[#242424] py-4">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} {site.name}. All Rights
            Reserved. Developed by{" "}
            <a
              href="https://longtail.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:text-amber-500 transition-colors"
            >
              Longtail e media
            </a>
            .
          </p>
          <div className="flex gap-3">
            {socialLinks?.items?.map((item: SocialLinkItem, index: number) => (
              <a
                key={index}
                href={item?.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item?.title || "Social media link"}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-colors"
              >
                {item?.image ? (
                  <Image
                    src={item.image}
                    alt={item?.title || "Social media link"}
                    width={24}
                    height={24}
                  />
                ) : (
                  <i className={item?.icon}></i>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
