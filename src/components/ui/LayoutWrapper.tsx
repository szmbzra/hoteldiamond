"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
  navbar,
  footer,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDealOfTheDay = pathname === "/dod";

  return (
    <>
      {!isDealOfTheDay && navbar}
      <div className="flex-grow">{children}</div>
      {!isDealOfTheDay && footer}
    </>
  );
}
