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
      {/* 1. Blog Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 bg-[#231f20] text-white overflow-hidden group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {(blog.banner_image || blog.image) && (
            <Image
              src={blog.banner_image || blog.image}
              alt={blog.title}
              height={1080}
              width={1920}
              priority
              className="object-cover w-full h-full opacity-30 transition-transform duration-1000 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#231f20]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="flex justify-center items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-medium text-gold mb-12">
              <Link
                href="/"
                className="hover:text-white transition-colors duration-300"
              >
                Home
              </Link>
              <span className="w-1 h-1 rounded-full bg-gold/40"></span>
              <Link
                href="/blog"
                className="hover:text-white transition-colors duration-300"
              >
                Blog
              </Link>
              <span className="w-1 h-1 rounded-full bg-gold/40"></span>
              <span className="text-white/60">Details</span>
            </nav>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-12 leading-[1.1] animate-fade-in">
              {blog.title}
            </h1>

            {/* Metadata Row */}
            <div className="flex flex-wrap justify-center items-center gap-10 text-xs tracking-widest uppercase text-gray-400">
              <div className="flex items-center gap-4">
                <span className="text-gold">Author</span>
                <span className="text-white">
                  {blog.author || `${site.shortName} Team`}
                </span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden md:block"></div>
              <div className="flex items-center gap-4">
                <span className="text-gold">Date</span>
                <span className="text-white">{blog.date}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Content Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8">
            {/* Hero Image */}
            <div className="relative aspect-[16/10] mb-16 overflow-hidden bg-gray-100 group">
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

            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4 text-[#231f20]">
              {blog.title}
            </h2>

            {/* Article Text Body */}
            <div className="rich-text-content mb-24" dangerouslySetInnerHTML={{ __html: blog.content }} />
            
            {/* Social & Sharing Bar */}
            <ShareBar title={blog.title} image={blog.image} />

            {/* Post Navigation (Prev/Next) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 mt-16 border border-gray-100">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="bg-white p-10 group flex flex-col gap-4 hover:bg-[#f9f7f2] transition-colors"
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
                    <ChevronLeft size={12} />
                    <span>Previous Post</span>
                  </div>
                  <h4 className="text-lg font-light leading-tight group-hover:text-gold transition-colors">
                    {prevPost.title}
                  </h4>
                </Link>
              ) : (
                <div className="bg-white p-10" />
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="bg-white p-10 group flex flex-col items-end gap-4 text-right hover:bg-[#f9f7f2] transition-colors"
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
                    <span>Next Post</span>
                    <ChevronRight size={12} />
                  </div>
                  <h4 className="text-lg font-light leading-tight group-hover:text-gold transition-colors">
                    {nextPost.title}
                  </h4>
                </Link>
              ) : (
                <div className="bg-white p-10" />
              )}
            </div>

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
