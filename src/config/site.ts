/**
 * ============================================================================
 *  SITE CONFIG — the single source of truth for this property's identity.
 * ============================================================================
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** Core brand identity. */
export const site = {
  name: "Hotel Diamond Palace Pvt. Ltd",
  shortName: "Hotel Diamond Palace",
  title: "Hotel Diamond Palace Pvt. Ltd | Nepalgunj, Nepal",
  description:
    "Hotel Diamond Palace Pvt. Ltd offers luxury accommodation in Nepalgunj, just steps from the revered Bageshwori Temple and close to Banke National Park. Guests enjoy modern comfort, exceptional dining, and versatile event spaces.",
  keywords:
    "Hotel Diamond Palace, Nepalgunj hotel, Bageshwori Temple, Banke National Park, luxury hotel Nepal, 4-star hotel Nepalgunj, business hotel Nepal",
  locale: "en",
  schemaType: ["Hotel", "LodgingBusiness"] as readonly string[],
} as const;

/** Contact channels. */
export const contact = {
  phone: "081-530835",
  phoneE164: "081-530835",
  whatsapp: "+9779801330050",
  email: "info@hoteldiamondpalace.com.np",
} as const;

/** Physical location. */
export const address = {
  street: "Bageshwori Tole-2, Surkhet Road",
  locality: "Nepalgunj",
  region: "Banke, Lumbini Province",
  postalCode: "21900",
  country: "NP",
  full: "Bageshwori Tole-2, Surkhet Road, Nepalgunj, Banke, Nepal",
  geo: { latitude: 28.0500, longitude: 81.6167 }, // approximate Nepalgunj coords
  mapUrl: "https://maps.app.goo.gl/yourhotelmaplink",
} as const;

/** Operational facts. */
export const business = {
  priceRange: "$$",
  currency: "NPR",
  starRating: 4,
  checkinTime: "14:00",
  checkoutTime: "12:00",
  numberOfRooms: 95,
  languages: ["English", "Nepali"],
  amenities: [
    "Swimming Pool",
    "Fitness Center",
    "Sauna & Steam",
    "Free WiFi",
    "Restaurant",
    "Coffee Shop",
    "Parking",
    "24-Hour Front Desk",
  ],
  aggregateRating: {
    ratingValue: "4.5",
    reviewCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
} as const;

/** Booking + social links. */
export const links = {
  booking: "https://hoteldiamondpalace.com.np/book",
  social: [] as string[],
} as const;

/** CMS category IDs. */
export const CATEGORY_IDS = {
  rooms: "1",
  events: "6",
  restaurant: "7",
} as const;
