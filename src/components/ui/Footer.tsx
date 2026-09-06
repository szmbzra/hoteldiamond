import { getMenuItems, getSiteRegulars, getSocialGroup, getBlogs } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import FloatingButtons from './Floating';
import Newsletter from './Newsletter';
import { MapPin, Phone, Mail } from 'lucide-react';

import visa from '@/assets/visa.png'
import mastercard from '@/assets/mastercard.png'
import amerciaexpress from '@/assets/americaexpress.png'
import fonepay from '@/assets/fonepage.png'

import { site, contact, address } from '@/config/site';

interface SocialLink {
  title?: string;
  url?: string;
  image?: string;
  icon?: string;
}

export default async function Footer() {
  const [menuItems, siteRegulars, socialLinks, blogs] = await Promise.all([
    getMenuItems(2),
    getSiteRegulars(),
    getSocialGroup(1),
    getBlogs(),
  ]);

  const brandName = siteRegulars?.sitetitle || site.name;
  const logoUrl = siteRegulars?.footer_logo_upload || "";
  const description = siteRegulars?.brief || site.description;

  // Resilient contact details: fetchAPI fails soft (→ null when the CMS is
  // unreachable), so never read fields directly. Fall back to the config
  // identity and never call .split on a missing value.
  const fiscalAddress = siteRegulars?.fiscal_address || address.full;
  const toList = (value?: string) =>
    (value ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const phoneNumbers = toList(siteRegulars?.contact_info || contact.phone);
  const emailAddresses = toList(siteRegulars?.email_address || contact.email);

  const latestPosts = (blogs || []).slice(0, 3);

  // Split the CMS footer menu into two even columns for the "Useful Links" block.
  const linkMid = Math.ceil(menuItems.length / 2);
  const linksColA = menuItems;


  return (
    <>
      <footer style={{ background: 'var(--luxury-cream)' }}>
        {/* ── Top bar: social + newsletter ── */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            {/* Social */}
            <div className="flex flex-wrap items-center gap-6">
              <h3
                className="text-lg leading-snug font-normal"
                style={{ color: 'var(--luxury-charcoal)' }}
              >
                Follow Our
                <br className="hidden sm:block" /> Social Networks
              </h3>
              {socialLinks?.items?.length > 0 && (
                <div className="flex gap-3">
                  {socialLinks.items.map((item: SocialLink, index: number) => (
                    <a
                      key={index}
                      href={item?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item?.title || 'Social media link'}
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-gold"
                      style={{ background: 'rgba(227, 201, 161, 0.18)', color: 'var(--luxury-gold-text)' }}
                    >
                      {item?.image ? (
                        <Image src={item.image} alt={item.title || ''} width={18} height={18} />
                      ) : (
                        <i className={`${item?.icon} text-sm`}></i>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Newsletter */}
            <Newsletter />
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="h-px" style={{ background: 'var(--luxury-border)' }}></div>
        </div>

        {/* ── Columns ── */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-6 md:pe-20">
              <Link href="/" className="inline-flex items-center gap-3 mb-5">
                {logoUrl && (
                  <Image
                    src={logoUrl}
                    alt={brandName}
                    width={100}
                    height={100}
                    className=" w-auto object-contain"
                  />
                )}
              </Link>
              {description && (
                <p className="leading-relaxed mb-4" style={{ color: 'var(--luxury-muted)' }}>
                  {description}
                </p>
              )}
            </div>

            {/* Useful Links */}
            <div className="lg:col-span-2">
              <h4 className="luxury-label text-gold-text mb-4">Useful Links</h4>
              <div className="luxury-divider mb-8"></div>
              <div className="grid grid-cols-1 gap-6 md:gap-8">
                <ul className="space-y-4 min-w-0">
                  {linksColA.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.link}
                        className="transition-colors duration-300 hover:text-gold-text"
                        style={{ color: 'var(--luxury-muted)' }}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>

              </div>
            </div>

            {/* Get In Touch */}
            <div className="lg:col-span-4">
              <h4 className="luxury-label text-gold-text mb-4">Get In Touch</h4>
              <div className="luxury-divider mb-8"></div>
              <ul className="space-y-5">
                {fiscalAddress && (
                  <li className="flex items-start gap-3">
                    <MapPin
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: 'var(--luxury-gold-text)' }}
                    />
                    <span style={{ color: 'var(--luxury-muted)' }}>{fiscalAddress}</span>
                  </li>
                )}
                {phoneNumbers.map((phone) => (
                  <li key={phone} className="flex items-center gap-3">
                    <Phone
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--luxury-gold-text)' }}
                    />
                    <a
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="transition-colors duration-300 hover:text-gold-text"
                      style={{ color: 'var(--luxury-muted)' }}
                    >
                      {phone}
                    </a>
                  </li>
                ))}
                {emailAddresses.map((email) => (
                  <li key={email} className="flex items-center gap-3">
                    <Mail
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--luxury-gold-text)' }}
                    />
                    <a
                      href={`mailto:${email}`}
                      className="transition-colors duration-300 hover:text-gold-text break-all"
                      style={{ color: 'var(--luxury-muted)' }}
                    >
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="h-px" style={{ background: 'var(--luxury-border)' }}></div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ color: 'var(--luxury-muted)' }}
        >
          <p>
            &copy; {new Date().getFullYear()} {brandName}. All Rights Reserved. Developed by{" "}
            <a
              href="https://longtail.info"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-gold-text"
              style={{ color: 'var(--luxury-charcoal)' }}
            >
              Longtail e media
            </a>
            .
          </p>
          <div className="flex items-center gap-3">
            <span>We Accept</span>
            <div className="flex items-center gap-2">
              <div className="bg-white px-2 py-0.5 rounded-sm" style={{ border: '1px solid var(--luxury-border)' }}>
                <Image className="object-contain w-auto h-auto" src={visa} alt="Visa" width={30} height={30} />
              </div>
              <div className="bg-white px-2 py-0.5 rounded-sm" style={{ border: '1px solid var(--luxury-border)' }}>
                <Image className="object-contain w-auto h-auto" src={amerciaexpress} alt="American Express" width={30} height={30} />
              </div>
              <div className="bg-white px-2 py-0.5 rounded-sm" style={{ border: '1px solid var(--luxury-border)' }}>
                <Image className="object-contain w-auto h-auto" src={mastercard} alt="Mastercard" width={30} height={30} />
              </div>
              <div className="bg-white px-2 py-0.5 rounded-sm" style={{ border: '1px solid var(--luxury-border)' }}>
                <Image className="object-contain w-auto h-auto" src={fonepay} alt="Fonepay" width={35} height={35} />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Floating Buttons ── */}
      <FloatingButtons whatsappNumber={siteRegulars?.whatsapp_a} />
    </>
  );
}
