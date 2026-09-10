"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import NavLink from "./NavLink";
import { NavItem } from "@/types";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menu: NavItem[];
}

/** Thin gradient underline that fades to transparent — replaces hard borders. */
function FadeUnderline({ active }: { active?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={` absolute -bottom-1.5 left-0 h-px w-full origin-left bg-gradient-to-r from-blue via-blue/35 to-transparent transition-transform duration-500 ease-out ${
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  );
}

export default function Sidebar({ isOpen, onClose, menu }: SidebarProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-blue/55 backdrop-blur-[3px] z-[55] transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar Panel */}
      <div
        id="sidebar-menu"
        className={`fixed top-0 right-0 w-full max-w-sm h-screen z-[60] overflow-hidden flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Glass surface */}
        <div className="absolute inset-0 bg-white/90  backdrop-saturate-150 border-l border-white/60" />
        {/* Soft brand glow accents */}

        {/* Content */}
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className=" flex items-center justify-end px-8 sm:px-3 py-4 shrink-0">
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="text-blue/70 hover:text-blue  hover:cursor-pointer transition-all duration-300 hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>
            <span className="absolute bottom-0 left-8 right-8 sm:left-10 sm:right-10 h-px bg-gradient-to-r from-transparent via-blue/20 to-transparent" />
          </div>

          {/* Menu Content */}
          <nav className="flex-1 overflow-y-auto px-8 sm:px-6 ">
            {menu &&
              menu.map((item) => {
                const isActive = pathname === item.link || (item.link !== "/" && pathname.startsWith(item.link));

                if (item.subLinks && item.subLinks.length > 0) {
                  const isSubmenuActive =
                    isActive || item.subLinks.some((sub) => pathname === sub.link || (sub.link !== "/" && pathname.startsWith(sub.link)));
                  const isDropdownOpen = openDropdown === item.title;
                  const submenuId = `submenu-${item.id}`;
                  return (
                    <div key={item.id} className="mb-1">
                      {/* Split row: the label navigates to the listing page, the arrow toggles the submenu */}
                      <div
                        className={`group flex items-center justify-between py-3.5 text-sm uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                          isSubmenuActive ? "text-blue" : "text-blue/70 hover:text-blue"
                        }`}
                      >
                        <NavLink
                          href={item.link}
                          linktype={item.linktype}
                          onClick={onClose}
                          className="flex-1"
                        >
                          <span className="relative inline-block">
                            {item.title}
                            <FadeUnderline active={isSubmenuActive} />
                          </span>
                        </NavLink>
                        <button
                          type="button"
                          onClick={() => toggleDropdown(item.title)}
                          aria-expanded={isDropdownOpen}
                          aria-controls={submenuId}
                          aria-label={`${isDropdownOpen ? "Collapse" : "Expand"} ${item.title} submenu`}
                          className="p-2 -m-2 hover:cursor-pointer"
                        >
                          <ChevronDown
                            className={`w-4 h-4 text-blue/50 transition-transform duration-300 ${
                              isDropdownOpen ? "rotate-180 text-blue" : ""
                            }`}
                          />
                        </button>
                      </div>
                      <div
                        id={submenuId}
                        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                          isDropdownOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0 flex flex-col gap-3.5 pl-1 pt-1">
                          {item.subLinks.map((subLink) => {
                            const isSubActive = pathname === subLink.link || (subLink.link !== "/" && pathname.startsWith(subLink.link));
                            return (
                              <NavLink
                                key={subLink.id}
                                href={subLink.link}
                                linktype={subLink.linktype}
                                onClick={onClose}
                                className={`group flex items-center gap-3 text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                                  isSubActive ? "text-blue" : "text-blue/55 hover:text-blue"
                                }`}
                              >

                                <span className="relative inline-block ms-1.5">
                                  {subLink.title}
                                  <FadeUnderline active={isSubActive} />
                                </span>
                              </NavLink>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.id}
                    href={item.link}
                    linktype={item.linktype}
                    onClick={onClose}
                    className={`group block py-3 mb-1 text-sm uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                      isActive ? "text-blue" : "text-blue/70 hover:text-blue"
                    }`}
                  >
                    <span className="relative inline-block">
                      {item.title}
                      <FadeUnderline active={isActive} />
                    </span>
                  </NavLink>
                );
              })}
          </nav>
        </div>
      </div>
    </>
  );
}
