import { NEWS_HEADER } from "@/data/data";
import { getBlogs } from '@/lib/data';
import NewsGrid from '../ui/NewsGrid';

export default async function LatestNews() {
  const data = await getBlogs();
  const news = data.slice(0,3);
  const header = NEWS_HEADER;

  if (news.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="luxury-label text-gold-text mb-4 animate-fade-in-up">
            {header.label}
          </div>
          <div className="flex justify-center mb-8">
            <div className="luxury-divider animate-fade-in-up delay-100"></div>
          </div>
          <h2 className="luxury-section-title animate-fade-in-up delay-200" style={{ color: 'var(--luxury-charcoal)' }}>
            {header.title}
          </h2>
        </div>

        {/* News Grid */}
        <div className="flex">
          <NewsGrid news={news}/>
        </div>
      </div>

      {/* Bottom gold accent */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, var(--luxury-gold), transparent)' }}></div>
    </section>
  );
}
