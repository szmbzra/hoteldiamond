"use client";

import { useState } from "react";
import { X, ChevronDown, Phone, Mail } from "lucide-react";
import NavLink from "./NavLink";
import { NavItem } from "@/types";
import { usePathname } from "next/navigation";
import { contact } from "@/config/site";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menu: NavItem[];
  bookingHref?: string;
}

/** Thin gold underline that fades to transparent — replaces hard borders. */
function FadeUnderline({ active }: { active?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={` absolute -bottom-1.5 left-0 h-px w-full origin-left bg-gradient-to-r from-gold via-gold/40 to-transparent transition-transform duration-500 ease-out ${
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  );
}

export default function Sidebar({
  isOpen,
  onClose,
  menu,
  bookingHref,
}: SidebarProps) {
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
        className={`fixed top-0 right-0 w-full max-w-sm sm:max-w-md h-screen z-[60] overflow-hidden flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Glass surface */}
        <div className="absolute inset-0 bg-luxury-cream backdrop-saturate-150 border-l border-white/60" />
        {/* Soft brand glow accents */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold/25 blur-[90px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-24 w-72 h-72 rounded-full bg-blue/15 blur-[90px] pointer-events-none"
        />

        {/* Content */}
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className="relative flex items-center justify-end gap-4 px-8 sm:px-10 pt-7 pb-5 shrink-0">
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="group w-10 h-10 shrink-0 rounded-full border border-blue/15 flex items-center justify-center text-blue/70 hover:text-blue hover:border-gold hover:bg-gold/10 hover:cursor-pointer transition-all duration-300"
            >
              <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
            </button>
            <span className="absolute bottom-0 left-8 right-8 sm:left-10 sm:right-10 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          </div>

          {/* Menu Content */}
          <nav className="flex-1 overflow-y-auto no-scrollbar px-8 sm:px-10 pt-4">
            {menu &&
              menu.map((item, index) => {
                const isActive =
                  pathname === item.link ||
                  (item.link !== "/" && pathname.startsWith(item.link));

                const itemStyle = {
                  transitionDelay: isOpen ? `${120 + index * 70}ms` : "0ms",
                };

                if (item.subLinks && item.subLinks.length > 0) {
                  const isSubmenuActive =
                    isActive ||
                    item.subLinks.some(
                      (sub) =>
                        pathname === sub.link ||
                        (sub.link !== "/" && pathname.startsWith(sub.link)),
                    );
                  const isDropdownOpen = openDropdown === item.title;
                  const submenuId = `submenu-${item.id}`;
                  return (
                    <div
                      key={item.id}
                      style={itemStyle}
                      className={`mb-1 transform transition-all duration-500 ease-out ${
                        isOpen
                          ? "translate-x-0 opacity-100"
                          : "translate-x-6 opacity-0"
                      }`}
                    >
                      {/* Split row: the label navigates to the listing page, the arrow toggles the submenu */}
                      <div
                        className={`group flex items-center justify-between gap-3 py-3 transition-colors duration-300 ${
                          isSubmenuActive
                            ? "text-blue"
                            : "text-blue/70 hover:text-blue"
                        }`}
                      >
                        <NavLink
                          href={item.link}
                          linktype={item.linktype}
                          onClick={onClose}
                          className="flex flex-1 items-center min-w-0"
                        >
                          <span className="relative inline-block font-display text-xl sm:text-2xl font-normal tracking-wide">
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
                          className="p-2 -m-2 shrink-0 hover:cursor-pointer"
                        >
                          <ChevronDown
                            className={`w-4 h-4 text-gold-text/70 transition-transform duration-300 ${
                              isDropdownOpen ? "rotate-180 text-gold-text" : ""
                            }`}
                          />
                        </button>
                      </div>
                      <div
                        id={submenuId}
                        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                          isDropdownOpen
                            ? "grid-rows-[1fr] opacity-100 pb-3"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0 flex flex-col gap-1 pl-4 ml-1 border-l border-blue/10 pt-1">
                          {item.subLinks.map((subLink) => {
                            const isSubActive =
                              pathname === subLink.link ||
                              (subLink.link !== "/" &&
                                pathname.startsWith(subLink.link));
                            return (
                              <NavLink
                                key={subLink.id}
                                href={subLink.link}
                                linktype={subLink.linktype}
                                onClick={onClose}
                                className={`group flex items-center gap-2.5 rounded-md px-3 py-2.5 text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                                  isSubActive
                                    ? "text-blue bg-gold/10"
                                    : "text-blue/55 hover:text-blue hover:bg-blue/5"
                                }`}
                              >
                                <span
                                  aria-hidden="true"
                                  className={`h-1 w-1 rounded-full shrink-0 transition-colors duration-300 ${
                                    isSubActive
                                      ? "bg-gold"
                                      : "bg-blue/30 group-hover:bg-gold-text"
                                  }`}
                                />
                                <span className="relative inline-block">
                                  {subLink.title}
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
                  <div
                    key={item.id}
                    style={itemStyle}
                    className={`transform transition-all duration-500 ease-out ${
                      isOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-6 opacity-0"
                    }`}
                  >
                    <NavLink
                      href={item.link}
                      linktype={item.linktype}
                      onClick={onClose}
                      className={`group flex items-center py-3 mb-1 transition-colors duration-300 ${
                        isActive ? "text-blue" : "text-blue/70 hover:text-blue"
                      }`}
                    >
                      <span className="relative inline-block font-display text-xl sm:text-2xl font-normal tracking-wide">
                        {item.title}
                        <FadeUnderline active={isActive} />
                      </span>
                    </NavLink>
                  </div>
                );
              })}
          </nav>

          {/* Footer: booking CTA + quick contact */}
          <div className="relative shrink-0 px-8 sm:px-10 pt-5 pb-8">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-6" />
            {bookingHref && (
              <a
                href={bookingHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="luxury-btn luxury-btn-solid w-full justify-center text-[11px]"
              >
                Book Now
              </a>
            )}
            <div className="mt-6 flex flex-col gap-2.5 text-xs text-blue/60">
              <a
                href={`tel:${contact.phoneE164.replace(/\s+/g, "")}`}
                className="flex items-center gap-2.5 hover:text-blue transition-colors duration-300"
              >
                <Phone className="w-3.5 h-3.5 text-gold-text shrink-0" />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 hover:text-blue transition-colors duration-300"
              >
                <Mail className="w-3.5 h-3.5 text-gold-text shrink-0" />
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
