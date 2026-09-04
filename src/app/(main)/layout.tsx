import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LayoutWrapper from "@/components/ui/LayoutWrapper";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Skip link — lets keyboard users jump past navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:bg-gold focus:text-black focus:rounded focus:font-medium focus:text-sm"
      >
        Skip to main content
      </a>
      <LayoutWrapper navbar={<Navbar />} footer={<Footer />}>
        {children}
      </LayoutWrapper>
    </>
  );
}
