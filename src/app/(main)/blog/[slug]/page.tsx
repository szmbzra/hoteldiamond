import { Metadata } from "next";
import { getBlogs, findBlogIndex, findBlogBySlug } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShareBar from "@/components/blog/ShareBar";
import { buildMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, site } from "@/config/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post: any = await findBlogBySlug(slug);

  const postTitle = post?.meta_title || post?.title;
  const postDesc = post?.meta_description || post?.brief || post?.excerpt;
  const postKeywords = post?.meta_keywords;
  const postImage = post?.image || post?.img || post?.fb_img || "";

  return buildMetadata(
    "blog",
    {
      title: postTitle ? `${postTitle} | ${site.shortName}` : undefined,
      description: postDesc || undefined,
      keywords: postKeywords || undefined,
      openGraph: {
        type: "article",
        title: postTitle || undefined,
        description: postDesc || undefined,
        ...(postImage && { images: [{ url: postImage }] }),
        ...(post?.created_at && { publishedTime: post.created_at }),
        ...(post?.updated_at && { modifiedTime: post.updated_at }),
      },
    },
    `/blog/${slug}`
  );
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allBlogs = await getBlogs();
  const blogIndex = findBlogIndex(allBlogs, slug);

  const blog = allBlogs[blogIndex];

  if (!blog) {
    return notFound();
  }

  const recentPosts = allBlogs.filter((_, i) => i !== blogIndex).slice(0, 4);

  const prevPost = blogIndex > 0 ? allBlogs[blogIndex - 1] : null;
  const nextPost =
    blogIndex < allBlogs.length - 1 ? allBlogs[blogIndex + 1] : null;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: (blog as any).brief || (blog as any).excerpt || blog.title,
    image: blog.banner_image || blog.image,
    author: {
      "@type": "Person",
      name: blog.author || `${site.shortName} Team`,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    url: `${SITE_URL}/blog/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
    ...((blog as any).created_at && { datePublished: (blog as any).created_at }),
    ...((blog as any).updated_at
      ? { dateModified: (blog as any).updated_at }
      : (blog as any).created_at
        ? { dateModified: (blog as any).created_at }
        : {}),
  };

  return (
    <>
    <JsonLd schema={blogPostingSchema} />
    <main className="min-h-screen bg-white">


      {/* 2. Content Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-12 leading-[1.1] animate-fade-in">
              {blog.title}
            </h1>
            {/* Hero Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 group">
              {blog.image && (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  height={1080}
                  width={1920}
                  className="object-cover h-full w-full transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
              )}
            </div>
             <div className="flex flex-wrap items-center gap-10 justify-between  mt-6 mb-9 border-b-1 pb-8 text-stone-400">
              <div className="flex">
                <span >Author :</span>
                <span>
                  {blog.author || `${site.shortName} Team`}
                </span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden md:block"></div>
              <div className="flex items-center gap-4">
                <span>Date:</span>
                <span>{blog.date}</span>
              </div>
            </div>

            {/* Article Text Body */}
            <div className="leading-[1.8] mb-15" dangerouslySetInnerHTML={{ __html: blog.content }} />

            {/* Social & Sharing Bar */}
            <ShareBar title={blog.title} image={blog.image} />

          </div>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-24">
            {/* Recent Posts Widget */}
            <div className="space-y-12">
              <div className="relative">
                <h3 className="text-xs uppercase tracking-[0.3em] text-gold-text font-semibold mb-8">
                  Recent Stories
                </h3>
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold"></div>
              </div>
              <div className="space-y-10">
                {recentPosts.map((post, i) => (
                  <Link
                    key={i}
                    href={`/blog/${post.slug}`}
                    className="group flex gap-6 items-center"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-gray-100">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          height={1080}
                          width={1920}
                          className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-gray-400">
                        {post.date}
                      </span>
                      <h4 className="text-[15px] font-light leading-tight group-hover:text-gold transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
    </>
  );
}
