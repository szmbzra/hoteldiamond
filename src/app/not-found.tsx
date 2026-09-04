import { Metadata } from "next";
import NotFoundClient from "@/components/ui/NotFoundClient";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `404 - Page Not Found | ${site.shortName}`,
  description: "The page you are looking for does not exist. Let us guide you back to our experience.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
