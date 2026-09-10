import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Building2, Dumbbell } from "lucide-react";
import { getHomeArticleById, getSiteRegulars } from "@/lib/data";
import { DecorativeGlow } from "@/components/ui/DecorativeBlobs";
import { contact } from "@/config/site";

const HIGHLIGHTS = [
  { icon: BedDouble, label: "95 Rooms & Suites" },
  { icon: Building2, label: "3 Event Halls" },
  { icon: Dumbbell, label: "Wellness & Fitness" },
];

export default async function AboutSection() {
  const data = await getHomeArticleById(1);
  const siteRegulars = await getSiteRegulars();

  // CMS unreachable / block missing → skip the section instead of crashing.
  if (!data) return null;

  const phoneNumber = siteRegulars?.whatsapp_a || contact.phone;
  const featured = HIGHLIGHTS[0];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--luxury-cream)" }}
    >
      <DecorativeGlow variant="dark-gold" />
      <div className="relative max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-20 items-center">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative animate-slide-in-left">
            <div className="relative z-10">
              {data?.gallery_images?.map((img: any) => (
                <Image
                  key={img.id}
                  src={img.url}
                  alt={img.alt}
                  width={700}
                  height={520}
                  className="w-full h-auto object-cover"
                />
              ))}
            </div>

          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 animate-slide-in-right">
            {/* Label */}
            <div className="luxury-label text-gold-text mb-4">{data.title}</div>

            {/* Gold ornament line */}
            <div className="luxury-divider mb-8"></div>

            {/* Headline */}
            <h2
              className="luxury-section-title mb-8"
              style={{ color: "var(--luxury-charcoal)" }}
            >
              {data.subtitle}
            </h2>

            {data.content ? (
              <div
                className="luxury-subtitle mb-10  text-base! leading-[2.1]  lg:text-justify"

                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            ) : (
              <p
                className="luxury-subtitle mb-10 "

              >
                  Content Not Available
              </p>
            )}

            {/* Facilities */}
            <div
              className="grid grid-cols-3 gap-6 mb-10 pb-10"
              style={{ borderBottom: "1px solid var(--luxury-border)" }}
            >
              {HIGHLIGHTS.map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Icon
                    className="w-5 h-5 shrink-0"

                  />
                  <p
                    className="text-sm font-light tracking-wide w-auto"

                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/" className="luxury-btn bg-(--color-blue)">
              Explore More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
