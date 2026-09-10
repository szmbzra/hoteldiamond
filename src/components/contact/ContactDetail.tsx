import { getSiteRegulars } from "@/lib/data";
import { MailIcon, MapPin, Phone, Smartphone } from "lucide-react";
import { DecorativeGlow } from "@/components/ui/DecorativeBlobs";
import React from "react";

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function ContactItem({ icon, title, children }: ContactItemProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-8 text-center sm:text-start">
      <div className="flex justify-center sm:justify-start w-full sm:w-auto">{icon}</div>
      <div>
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <div className="text-gray-600 text-md flex flex-col space-y-1 leading-relaxed">
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
      {items.split(",").map((item, index) => (
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
    <section className="relative overflow-hidden bg-white px-6 md:px-12 w-[1100px] mx-auto my-5">
      <DecorativeGlow variant="gold-dark" sizeA={380} sizeB={360} />

      {/* Contact Info Grid */}
      <div className="relative flex justify-between">

        {/* Landline */}
        <ContactItem icon={<Smartphone size={50} strokeWidth={1} />} title="Phone">
          <ContactLinks items={siteRegulars?.landline_info} prefix="tel:" />
        </ContactItem>

        {/* Mobile */}
        <ContactItem icon={<Phone size={50} strokeWidth={1} />} title="Mobile">
          <ContactLinks items={siteRegulars?.contact_info} prefix="tel:" />
        </ContactItem>

        {/* Email */}
        <ContactItem icon={<MailIcon size={50} strokeWidth={1} />} title="Email">
          <ContactLinks items={siteRegulars?.email_address} prefix="mailto:" />
        </ContactItem>
      </div>
    </section>
  );
}
