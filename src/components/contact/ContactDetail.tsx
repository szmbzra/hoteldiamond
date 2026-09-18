import { getSiteRegulars } from "@/lib/data";
import { MailIcon, MapPin, Phone, Smartphone } from "lucide-react";
import { OrganicBlobGlow } from "@/components/ui/OrganicBlobs";
import React from "react";

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function ContactItem({ icon, title, children }: ContactItemProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-8 text-center sm:text-start">
      <div className="flex justify-center sm:justify-start w-full sm:w-auto text-white">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <div className="text-gray-600 text-md flex flex-col space-y-1 leading-relaxed text-white">
          {children}
        </div>
      </div>
    </div>
  );
}

function ContactLinks({ items, prefix }: { items?: string; prefix: string }) {
  if (!items) return null;
  return (
    <>
      {items
        .split(",")
        .slice(0, 2)
        .map((item, index) => (
          <a
            key={index}
            href={`${prefix}${item.replace(/\s+/g, "")}`}
            className="hover:text-gold transition-colors"
          >
            {item.trim()}
          </a>
        ))}
    </>
  );
}

export default async function ContactDetail() {
  const siteRegulars = await getSiteRegulars();

  return (
    <section className="relative overflow-hidden py-14 md:py-16 bg-[#042f48] p-12  text-white mt-10">
      {/* Contact Info Grid */}
      <div className="relative flex flex-col sm:flex-row justify-between gap-12 sm:gap-8 max-w-[1100px] mx-auto px-6 md:px-12">
        {/* Landline */}
        <ContactItem
          icon={<Smartphone size={50} strokeWidth={1} />}
          title="Phone"
        >
          <ContactLinks items={siteRegulars?.landline_info} prefix="tel:" />
        </ContactItem>

        {/* Mobile */}
        <ContactItem icon={<Phone size={50} strokeWidth={1} />} title="Mobile">
          <ContactLinks items={siteRegulars?.contact_info} prefix="tel:" />
        </ContactItem>

        {/* Email */}
        <ContactItem
          icon={<MailIcon size={50} strokeWidth={1} />}
          title="Email"
        >
          <ContactLinks items={siteRegulars?.email_address} prefix="mailto:" />
        </ContactItem>
      </div>
    </section>
  );
}
