import Link from 'next/link';
import { DINE_DATA } from "@/data/data";
import { getHomeArticleById } from '@/lib/data';

export default async function DineBanner() {
  // Fall back to bundled content when the CMS has no dine block.
  const fallback = {
    title: DINE_DATA.label,
    description: DINE_DATA.title,
    slug: DINE_DATA.link,
  };
  const data = (await getHomeArticleById(30)) || fallback;

  // Access the nested URL safely
  const backgroundImage = (data as any)?.imglink?.[0]?.url || '';


  return (
    <section
      className="relative flex items-center justify-center luxury-parallax"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        minHeight: '70vh',
      }}
    >
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10 text-center py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Label */}
          <div className="luxury-label text-white/50 mb-6 animate-fade-in-up delay-100">
            {data.title}
          </div>

          {/* Gold ornament */}
          <div className="luxury-ornament mb-10 animate-fade-in-up delay-200">
            <svg className="w-5 h-5" style={{ color: 'var(--luxury-gold)' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
            </svg>
          </div>

          {/* Headline */}
          <div className="text-white text-2xl md:text-3xl lg:text-4xl font-normal mb-12 animate-fade-in-up delay-300 max-w-5xl mx-auto leading-tight">
            <div dangerouslySetInnerHTML={{__html: data.description}} />
          </div>

          {/* CTA */}
          <div className="animate-fade-in-up delay-400">
            <Link href={data.slug} className="luxury-btn luxury-btn-light">
              Explore
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gold line accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--luxury-gold), transparent)' }}></div>
    </section>
  );
}
