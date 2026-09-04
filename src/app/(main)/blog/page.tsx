import Breadcrumb from "@/components/ui/Breadcrumb";
import NewsGrid from "@/components/ui/NewsGrid";
import PageSchemas from "@/components/seo/PageSchemas";
import { getBlogs, getPageHeroImage } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("blog", {}, "/blog");
}

export default async function BlogPage() {
  const data = await getBlogs();
  const backgroundImage = await getPageHeroImage("blog");
  return (
    <>
      <PageSchemas slug="blog" />
      <Breadcrumb
        backgroundImage={backgroundImage}
        title="Blog"
        items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        <NewsGrid news={data} />
      </div>
    </>
  );
}
