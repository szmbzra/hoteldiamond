import type { Metadata } from "next";

// Every page under this group is only ever reached while the site is
// under construction (see src/proxy.ts) — never meant to be indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ConstructionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
