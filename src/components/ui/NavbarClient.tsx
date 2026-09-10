"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { links } from "@/config/site";
import { usePathname } from "next/navigation";
import { NavItem } from "@/types";
interface NavbarClientProps {
  menu: NavItem[];
  logoUrl?: string;
}

export default function NavbarClient({ menu, logoUrl }: NavbarClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const pathname = usePathname();



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={` ${pathname == "/" ? " fixed" : ""} top-0 left-0 right-0 z-[70] transition-all duration-300 ${
        isScrolled ? "bg-(--luxury-cream) shadow-md py-2 fixed" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Hotel Diamond Palace"
                width={200}
                loading="eager"
                height={200}
                className={`transition-all duration-300 object-contain ${
                  isScrolled ? "h-20 w-auto" : "h-25 w-auto"
                }`}
              />
            ) : (
              <span className="text-white text-xl font-light tracking-wide">Hotel Diamond Palace</span>
            )}
          </Link>

          {/* Book Now + Sidebar Toggle (hidden while open — the sidebar itself has the close control) */}
          <div
            className={`flex items-center gap-3 sm:gap-5 transition-opacity duration-200 ${
              isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <Link
              href={links.booking}
              target="_blank"
              tabIndex={isSidebarOpen ? -1 : 0}
              className={` ${pathname !== "/" ? " text-black! border-black!" : ""} luxury-btn luxury-btn-book text-[10px] text-luxury-dark  ${

                isScrolled ? " text-black! border-black!" : ""}`}
            >
              Book Now
            </Link>

            <button
              className="p-3 focus-visible:outline-2 focus-visible:outline-white hover:cursor-pointer focus-visible:outline-offset-2 rounded"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isSidebarOpen}
              aria-controls="sidebar-menu"
              tabIndex={isSidebarOpen ? -1 : 0}
            >
              <Menu className={` ${pathname !== "/" ? " text-black! border-black!" : ""} w-6 h-6  ${ isScrolled ? "text-black" : "text-white"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        menu={menu}
      />
    </nav>
  );
}
