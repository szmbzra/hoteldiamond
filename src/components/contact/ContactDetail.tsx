import { getSiteRegulars } from "@/lib/data";
import { MailIcon, MapPin, Phone, Smartphone } from "lucide-react";
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
      <div className="w-full sm:w-auto">
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
    <section className="bg-white mx-auto px-6 md:px-12">
      {/* Title */}
      <div className="text-center sm:text-start mb-16">
        <h2 className="text-3xl font-light mb-4">Hotel Diamond Pvt. Ltd</h2>
        <div className="h-px w-16 bg-gold mx-auto sm:ml-0"></div>
        <p className="text-gray-600 text-md flex flex-col space-y-1 leading-relaxed mt-4">With its seamless blend of Traditional Nepali Hospitality and modern amenities, Hillcrest Resort creates a warm, welcoming atmosphere for every guest.</p>
      </div>

      {/* Contact Info Grid */}
      <div className="flex flex-col justify-start gap-8">
        {/* Address */}
        <ContactItem icon={<MapPin size={50} strokeWidth={1} />} title="Address">
          {siteRegulars?.fiscal_address}
        </ContactItem>

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
