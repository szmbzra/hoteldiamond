import {
  Landmark,
  Testimonial,
  NewsItem,
  Service,
  Facility,
  Room,
} from "../types";

// ============================================================
// HOMEPAGE MOCK DATA
// All content preserved from original, structured for API integration
// ============================================================

import logo from "@/assets/logo.png";
import footerLogo from "@/assets/light-logo.png";
import favicon from "@/assets/favicon.png";
import { site, contact, address, SITE_URL } from "@/config/site";






export const metaData = {

  // ---------------------------------------------------------------------------
  // SITE IDENTITY
  // DB columns: sitetitle, sitename
  // meta_tags.php: $config->sitetitle, $config->sitename
  // ---------------------------------------------------------------------------

  /** Full site title used in <title> tags. */
  sitetitle: site.title,

  /** Short brand name used in breadcrumbs, footers. */
  sitename: site.shortName,

  /** Full URL to the logo image (used in Schema.org + Navbar). */
  logo_upload: logo.src,

  /** Full URL to favicon image. */
  favicon: favicon.src,

  // ---------------------------------------------------------------------------
  // GLOBAL SEO
  // ---------------------------------------------------------------------------

  /** Default homepage <title>. */
  meta_title: site.title,

  /** Comma-separated keywords for <meta name="keywords">. */
  site_keywords: site.keywords,

  /** Default meta description for all pages. */
  site_description: site.description,

  /** Canonical base URL injected as <link rel="canonical">. */
  canonical_url: SITE_URL,

  // ---------------------------------------------------------------------------
  // PER-PAGE META TITLES
  // These override the global title on specific static pages.
  // Set per page in the CMS.  Mirrors meta_tags.php className_metatags() logic.
  // DB columns: gallery_meta_title, contact_meta_title, about_meta_title,
  //             events_meta_title, restaurant_meta_title
  // ---------------------------------------------------------------------------

  /** <title> for /gallery page. */
  gallery_meta_title: "Gallery - Hotel Diamond Pvt. Ltd",

  /** <title> for /contact page. */
  contact_meta_title: "Contact Us - Hotel Diamond Pvt. Ltd",

  /** <title> for /about page. */
  about_meta_title: "About - Hotel Diamond Pvt. Ltd",

  /** <title> for /programs page. */
  programs_meta_title: "Facilities - Hotel Diamond Pvt. Ltd",

  // ---------------------------------------------------------------------------
  // SOCIAL SHARING — OG & TWITTER
  // meta_tags.php: <meta property="og:image"> and <meta property="twitter:image">
  // DB columns: fb_upload, twitter_upload
  // These are image filenames stored server-side; the PHP prepends IMAGE_PATH.
  // Your API should return FULL URLs.
  // ---------------------------------------------------------------------------

  /** Full URL to the Open Graph image (shown when shared on Facebook, WhatsApp, LinkedIn).
   *  Recommended size: 1200×630 px
   *  DB column: fb_upload
   *  meta_tags.php: IMAGE_PATH . "preference/" . $config->fb_upload */
  fb_upload: "",

  /** Full URL to the Twitter card image (shown when shared on Twitter/X).
   *  Recommended size: 1200×628 px
   *  DB column: twitter_upload
   *  meta_tags.php: IMAGE_PATH . "preference/" . $config->twitter_upload */
  twitter_upload: "",

  // ---------------------------------------------------------------------------
  // GOOGLE ANALYTICS
  // meta_tags.php: $analytic block — injects gtag.js script into <head>
  // DB column: google_anlytics  (note: typo in DB, 'anlytics' not 'analytics')
  // Your API should expose it as: google_analytics_code
  // layout.tsx reads: siteRegulars?.google_analytics_code
  // ---------------------------------------------------------------------------

  /** Google Analytics measurement ID.  Format: "G-XXXXXXXXXX"
   *  Leave empty string "" or omit to disable GA injection entirely.
   *  DB column: google_anlytics  →  API key: google_analytics_code */
  google_analytics_code: "", // e.g. "G-ABC123XYZ9"

  // ---------------------------------------------------------------------------
  // SCHEMA.ORG JSON-LD   (structured data for Google rich results)
  // meta_tags.php: $schema block — always injected as <script type="application/ld+json">
  // The base Organisation schema is auto-generated in layout.tsx.
  // schema_code adds EXTRA fields after the publisher node.
  // DB column: schema_code
  // ---------------------------------------------------------------------------

  /** Extra raw JSON string appended inside the Schema.org object.
   *  Example: extra @type fields, contactPoint, address, openingHoursSpecification
   *  meta_tags.php: $schema .= "," . $config->schema_code
   *  Leave empty string "" if no extra schema needed. */
  schema_code: "", // e.g. '"contactPoint":{"@type":"ContactPoint","telephone":"+977-9818858090","contactType":"customer service"}'

  // ---------------------------------------------------------------------------
  // CUSTOM <head> INJECTION
  // meta_tags.php: $seoSources .= $config->headers
  // DB column: headers
  // This is raw HTML injected verbatim into <head>.
  // Useful for: third-party scripts, verification tags, custom CSS links.
  // layout.tsx: dangerouslySetInnerHTML={{ __html: siteRegulars.headers }}
  // ---------------------------------------------------------------------------

  /** Raw HTML string injected into <head> on every page.
   *  Examples: Google Search Console verification, Hotjar, Crisp chat, etc.
   *  DB column: headers
   *  Leave empty string "" if nothing to inject. */
  headers: "", // e.g. '<meta name="google-site-verification" content="XXXXX">'
  // ---------------------------------------------------------------------------
  // CONTACT & LOCATION  (used by Footer, ContactComponent, Navbar)
  // ---------------------------------------------------------------------------

  /** Google Maps embed URL */
  location_map:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.953482981846!2d84.5815912247255!3d27.90340077607072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39951f0004390a0f%3A0x7c2164964f8c3196!2sManakamana%20Hillcrest%20Resort!5e0!3m2!1sen!2snp",

  /** Google Maps directions URL */
  location_url: address.mapUrl,

  /** Primary email address */
  email_address: contact.email,

  /** Secondary email address (if any) */
  email_address_2: "",

  /** Physical / fiscal address */
  fiscal_address: address.full,

  /** Primary phone number */
  contact_info: contact.phone,

  /** WhatsApp number (may differ from contact_info) */
  whatsapp_a: contact.phone,

  // ---------------------------------------------------------------------------
  // CMS UPLOADED IMAGES  (used in various page sections)
  // ---------------------------------------------------------------------------

  /** Gallery section hero image */
  gallery_upload: "",

  /** Contact section background image */
  contact_upload: "",

  /** Online booking engine URL */
  booking_code: "",
};


export const HERO_DATA = {
  headline: "Manakamana Hillcrest",
  subheadline: "A Sanctuary in the Himalayas",
  tagline: "Where serenity meets luxury",
  videoSrc: "/video/hero.webm",
  scrollText: "Discover More",
};

export const ABOUT_DATA = {
  label: "Hotel Diamond Pvt. Ltd",
  title: "Enjoy a Luxury Experience",
  paragraphs: [
    "Welcome to Hotel Diamond Palace Pvt. Ltd, a premier destination in the heart of Nepalgunj. We combine modern luxury with warm Nepalese hospitality, offering guests an unforgettable stay whether they are here for business, leisure, or celebration.",

"Our property features 95 elegantly designed rooms, versatile event facilities, and exceptional dining outlets that showcase both authentic Nepalese flavours and international cuisine. With amenities like a swimming pool, fitness center, spa, and 24‑hour front desk, we ensure comfort and convenience at every step.",

"Located near the revered Bageshwori Temple and close to Banke National Park, Hotel Diamond Palace is perfectly positioned for cultural exploration and natural adventures. Our dedicated team strives to deliver personalized service, making every guest feel at home.",
  ],
  phone: contact.phoneE164,
  phoneLabel: "Reserve Now",
  image: "/images/placeholder-about.webp",
  badge: "• Manakamana • Hillcrest • Resort",
  stats: [
    { value: "50+", label: "Luxury Rooms" },
    { value: "4.8", label: "Guest Rating" },
    { value: "360°", label: "Mountain View" },
  ],
};

export const ROOMS_DATA = {
  label: "Your Comfort, Our Priority",
  title: "Deluxe Room",
  description:
    "Perched on the hillside, our Manakamana Hill Crest Deluxe Rooms offer breathtaking mountain views and serene surroundings. Thoughtfully designed with modern amenities and elegant interiors.",
  link: "/deluxe-room",
  features: ["Mountain View", "King Bed", "Private Balcony", "Free WiFi"],
};

export const FACILITIES_HEADER = {
  label: "Amenities That Elevate Your Stay",
  title: "Our Services",
};

export const DINE_DATA = {
  label: "Premium Service",
  title:
    "Offering panoramic views of the majestic Himalayas with our delicious catering service which please your gourmet",
  link: "/dining",
  linkText: "Explore",
  image: "/images/placeholder-dine.webp",
};

export const SERVICES_HEADER = {
  label: "Relax. Refresh. Rejuvenate",
  title: "Our Services",
};

export const OFFERS_HEADER = {
  label: "Exclusive Deals",
  title: "Special Offers",
};

export const LANDMARKS_HEADER = {
  label: "Attractions",
  title: "Nearby Landmarks",
};

export const TESTIMONIALS_HEADER = {
  label: "Guest Experiences",
  title: "What Our Guests Say",
};

export const NEWS_HEADER = {
  label: "Recent Updates",
  title: "Latest News",
};

// ============================================================
// EXISTING DATA ARRAYS — preserved exactly as-is
// ============================================================

export const LANDMARKS: Landmark[] = [
  {
    id: "manakamana-temple",
    tab: "Bageshwori Temple",
    title: "Bageshwori Temple",
    subtitle: "A Sacred Landmark of Nepalgunj",
    content:
      "Bageshwori Temple is one of the most revered religious sites in Nepalgunj and an important cultural landmark of the city. Dedicated to Goddess Bageshwori, the temple attracts devotees and visitors throughout the year. Its peaceful surroundings and rich religious significance make it a meaningful place to visit while staying at Hotel Diamond Palace.",
    distance: "2.5 km",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3525.953482981846!2d84.5815912247255!3d27.90340077607072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x39951f0004390a0f%3A0x7c2164964f8c3196!2sHotel%20Diamond%20Palace%2C%20Nepalgunj!3m2!1d28.05!2d81.62!4m5!1s0x0%3A0x0!2sBageshwori%20Temple%2C%20Nepalgunj!3m2!1d28.0525!2d81.6165!5e0!3m2!1sen!2snp",
  },
  {
    id: "cable-car",
    tab: "Banke National Park",
    title: "Banke National Park",
    subtitle: "A Natural Escape Near Nepalgunj",
    content:
      "Banke National Park is a protected natural area known for its forests, wildlife, and peaceful natural surroundings. The park provides opportunities to experience Nepal's diverse wildlife and explore the beauty of the Terai landscape. It is an ideal destination for guests looking to enjoy nature and discover the region beyond the city.",
    distance: "Approximately 12 km",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3525.968631473595!2d81.58!3d28.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x0%3A0x0!2sHotel%20Diamond%20Palace%2C%20Nepalgunj!3m2!1d28.05!2d81.62!4m5!1s0x0%3A0x0!2sBanke%20National%20Park!3m2!1d81.75!2d28.1!5e0!3m2!1sen!2snp",
  },
  {
    id: "siddha-cave",
    tab: "Mahendra Park & Mini Zoo",
    title: "Mahendra Park & Mini Zoo",
    subtitle: "A Relaxing Family Destination",
    content:
      "Mahendra Park & Mini Zoo is a family-friendly attraction in Nepalgunj featuring open green spaces, a small zoo, and areas where visitors can relax and enjoy time outdoors. It is a convenient place for families and guests looking for a relaxed outing close to the city.",
    distance: "1.2 km",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d14102.888529586282!2d81.62!3d28.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x0%3A0x0!2sHotel%20Diamond%20Palace%2C%20Nepalgunj!3m2!1d28.05!2d81.62!4m5!1s0x0%3A0x0!2sMahendra%20Park%20and%20Mini%20Zoo!3m2!1d81.62!2d28.06!5e0!3m2!1sen!2snp",
  },
  {
    id: "lakhan-thapa-cave",
    tab: "Kanti Tal (Puraini Lake)",
    title: "Kanti Tal (Puraini Lake)",
    subtitle: "Peaceful Waterside Surroundings",
    content:
      "Kanti Tal, also known as Puraini Lake, is a peaceful natural landmark near Nepalgunj. Surrounded by open landscapes and greenery, the lake offers visitors a quiet setting away from the busy city environment. It is a pleasant destination for guests who enjoy nature, fresh air, and relaxing outdoor surroundings.",
    distance: "Approximately 4 km",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d11744.770057542326!2d81.62!3d28.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x0%3A0x0!2sHotel%20Diamond%20Palace%2C%20Nepalgunj!3m2!1d28.05!2d81.62!4m5!1s0x0%3A0x0!2sKanti%20Tal%20Puraini%20Lake!3m2!1d81.62!2d28.07!5e0!3m2!1sen!2snp",
  },
  {
    id: "bakreshwor",
    tab: "Nepalgunj Local Market",
    title: "Nepalgunj Local Market",
    subtitle: "Discover the Flavours of the City",
    content:
      "The local markets of Nepalgunj offer an authentic glimpse into the everyday life and culture of the city. Guests can explore local shops, traditional products, food, and everyday goods while experiencing the lively atmosphere of one of western Nepal's important commercial centres.",
    distance: "Nearby",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d17598.33939342822!2d81.62!3d28.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x0%3A0x0!2sHotel%20Diamond%20Palace%2C%20Nepalgunj!3m2!1d28.05!2d81.62!4m5!1s0x0%3A0x0!2sNepalgunj%20Market!3m2!1d81.62!2d28.05!5e0!3m2!1sen!2snp",
  },
  {
    id: "bharatpur-airport",
    tab: "Nepalgunj Airport",
    title: "Nepalgunj Airport",
    subtitle: "Gateway to Western Nepal",
    content:
      "Nepalgunj Airport provides convenient air connectivity for guests travelling to and from western Nepal. Located close to the city, the airport makes Hotel Diamond Palace an accessible choice for both business and leisure travellers arriving in Nepalgunj.",
    distance: "Approximately 10 km",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d225855.8756642616!2d81.62!3d28.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x0%3A0x0!2sHotel%20Diamond%20Palace%2C%20Nepalgunj!3m2!1d28.05!2d81.62!4m5!1s0x0%3A0x0!2sNepalgunj%20Airport!3m2!1d81.67!2d28.10!5e0!3m2!1sen!2snp",
  },
];

export const TESTIMONIALS: Testimonial[] = [
{
title: "Great stay with friends!",
content:
"Visited Hotel Diamond Palace with friends and had a great time. The rooms were clean and comfortable, the atmosphere was peaceful, and the hospitality was excellent. The staff were friendly and helpful throughout our stay, and the food was delicious too. Overall, it was a wonderful experience and a great place to stay with friends. Would definitely recommend!",
author: "James G",
source: "Tripadvisor",
},
{
title: "Hotel Diamond Palace - Nepalgunj, Nepal",
content:
"This is definitely one of the best hotels we have stayed in Nepal. The location of Hotel Diamond Palace in Nepalgunj is excellent, making it convenient for exploring the city and nearby attractions. The customer service was excellent, the rooms were clean and comfortable, and the overall atmosphere was relaxing. The staff were welcoming and attentive throughout our stay, making the experience truly enjoyable.",
author: "Falcha",
source: "Tripadvisor",
},
{
title: "Holiday ❘ Family",
content:
"The stay was amazing and the hospitality was excellent. The hotel has a comfortable and welcoming atmosphere, making it a great choice for a family holiday. The staff were friendly and attentive, and everything was well taken care of during our stay. Would recommend 10/10.",
author: "Aditya maharjan",
source: "Google",
},
{
title: "Holiday ❘ Friends",
content:
"This is one of the best hotels to stay at in Nepalgunj. The staff are very friendly and welcoming, and the service was excellent throughout our stay. We were a group of friends and had a very comfortable and enjoyable experience. Everything was well managed and the atmosphere was perfect. You must visit and stay here.",
author: "Prakash Dhakhwa",
source: "Google",
},
{
title: "Holiday ❘ Family",
content:
"We had a lovely stay with our family. The staff were very kind and welcoming, and the room was clean, comfortable, and spacious. Everything felt easy and family-friendly throughout our stay. Thank you for making our visit so special. We would definitely come back again!",
author: "Sunil Thapa",
source: "Google",
},
{
title: "Holiday ❘ Couple",
content:
"Hotel Diamond Palace is one of the best hotels to stay at in Nepalgunj. We had a wonderful experience at this beautiful property. The staff were welcoming, attentive, and provided excellent hospitality throughout our stay. The comfortable rooms, pleasant atmosphere, and quality service made our visit truly enjoyable.",
author: "Krishna Shrestha",
source: "Google",
},
];


export const NEWS: NewsItem[] = [
  {
    category: "Resort",
    date: "14 Feb, 2024",
    title: "Embracing the Beauty of Nature at Our Resort",
    desc: "Discovering Tranquility Amidst Breathtaking Landscapes",
    image: "/images/placeholder-news-1.webp",
    link: "/blog-details/embracing-the-beauty-of-nature-at-our-resort",
  },
  {
    category: "Events",
    date: "12 Feb, 2024",
    title: "A Spectacular Destination for Special Events",
    desc: "Unforgettable Moments in a Picturesque Setting",
    image: "/images/placeholder-news-2.webp",
    link: "/blog-details/a-spectacular-destination-for-special-events",
  },
  {
    category: "Attraction",
    date: "10 Feb, 2024",
    title: "Attractions near our Resort",
    desc: "Exploring Attractions Near Manakamana Temple",
    image: "/images/placeholder-news-3.webp",
    link: "/blog-details/attractions-near-our-resort",
  },
];

export const SERVICES: Service[] = [
  {
    title: "Events & Wedding Destination",
    desc: "We specialize in creating unforgettable moments whether you're planning a high-powered corporate retreat or the wedding of your dreams. With world-class amenities, elegant venues, and exceptional service, our resort is the perfect destination for both business and celebration.",
    link: "/gorkha-hall",
    image: "/images/placeholder-service-1.webp",
  },
  {
    title: "Sauna & Steam",
    desc: "Unwind in our dedicated Sauna & Steam zone a tranquil retreat nestled in the serene hills of Manakamana. Whether you're seeking warmth, detox, or a moment of quiet, our facilities offer a peaceful escape to soothe your body and mind.",
    link: "/service/sauna-steam",
    image: "/images/placeholder-service-2.webp",
  },
  {
    title: "Fitness Center",
    desc: "Stay active and energized during your stay at our modern Fitness Center, equipped with a range of high-quality machines and free weights for all fitness levels. Whether you prefer a gentle warm-up, strength training, or a full-body workout, our gym offers a clean, safe environment.",
    link: "/service/fitness-center",
    image: "/images/placeholder-service-3.webp",
  },
  {
    title: "Outdoor Swimming Pool",
    desc: "Take a refreshing dip in our outdoor swimming pool, surrounded by the resort's scenic beauty and peaceful ambiance. Perfect for relaxation or a leisurely swim, the pool area also features aila bar, offering the refreshing drinks and light snacks throughout the day.",
    link: "/service/outdoor-swimming-pool",
    image: "/images/placeholder-service-4.webp",
  },
  {
    title: "Experiences Within Hillcrest",
    desc: "Our Resort is ideally located for guests eager to explore the rich cultural and natural treasures of the region. Begin your journey with a visit to sacred Manakamana Temple steeped in deep spiritual significance. For nature lovers, scenic hikes lead to hidden caves & ancient Dhunge Dhara.",
    link: "/service/experiences-within-hillcrest",
    image: "/images/placeholder-service-5.webp",
  },
  {
    title: "Aila Bar",
    desc: "Relax by the pool at our Poolside Bar, a laid-back spot surrounded by fresh hill air and scenic views of Manakamana. Whether you're cooling off after a swim or enjoying a quiet afternoon, it's the perfect place to unwind.",
    link: "/service/aila-bar",
    image: "/images/placeholder-service-6.webp",
  },
];

export const FACILITIES: Facility[] = [
  {
    title: "Welcome Drink (on Arrival)",
    desc: "Be greeted with a refreshing welcome drink upon arrival. Start your stay with a touch of relaxation and delight.",
    icon: "/images/placeholder-icon.png",
  },
  {
    title: "High Speed Internet",
    desc: "Stay connected with our high-speed fibre internet available throughout the resort. Perfect for work or streaming.",
    icon: "/images/placeholder-icon.png",
  },
  {
    title: "Wheelchair Friendly",
    desc: "Smooth access across rooms, dining, and outdoor areas designed for comfort, safety, and inclusivity.",
    icon: "/images/placeholder-icon.png",
  },
  {
    title: "Poolside Bar (Aila Bar)",
    desc: "Sip, relax, & unwind at our poolside bar. Whether you're craving a refreshing cocktail, a chilled mocktail, or light bites.",
    icon: "/images/placeholder-icon.png",
  },
  {
    title: "24hrs Reception",
    desc: "Our front desk is open around the clock to assist you with check-ins, travel queries, and personalized requests.",
    icon: "/images/placeholder-icon.png",
  },
  {
    title: "Swimming Pool",
    desc: "Relax in our outdoor swimming pool and enjoy refreshing drinks from the lively pool bar.",
    icon: "/images/placeholder-icon.png",
  },
  {
    title: "Mountain View",
    desc: "Wake up to breathtaking Himalayan vistas from your room. Every sunrise and sunset is a memory to cherish.",
    icon: "/images/placeholder-icon.png",
  },
  {
    title: "Room Service",
    desc: "Enjoy round-the-clock room service, available whenever you need it. Comfort & care are just a call away.",
    icon: "/images/placeholder-icon.png",
  },
];

export const ROOM_INCLUDES = [
  "Complimentary breakfast for two",
  "Free high-speed Wi-Fi",
  "Free cable car tickets",
  "Welcome drink on arrival",
  "Swimming pool access",
  "Sauna & steam access",
  "Daily housekeeping",
  "24/7 room service",
  "Panoramic mountain view",
  "Air conditioning",
];

export const ROOM_EXCLUDES = [
  "Alcoholic beverages",
  "Extra meals (lunch / dinner)",
  "Laundry service",
  "Airport transfers",
  "Spa treatments",
];

// TODO: temporary static fallback until the CMS exposes a per-room `amenities`
// field — RoomPage falls back to this only when the CMS item has none.
export const ROOM_AMENITIES_FALLBACK = [
  {
    group_title: "Room Amenities",
    items: [
      { title: "Free Wi-Fi" },
      { title: "Air Conditioning" },
      { title: "LED Television" },
      { title: "Attached Bathroom" },
      { title: "Hot & Cold Water" },
      { title: "Complimentary Toiletries" },
      { title: "Daily Housekeeping" },
      { title: "24-Hour Room Service" },
      { title: "Wardrobe" },
      { title: "Study Table" },
      { title: "Intercom" },
      { title: "Power Backup" },
    ],
  },
];

// TODO: temporary static fallback shown on /dining and /events until the CMS
// has real `subpackage` entries under parent_id CATEGORY_IDS.restaurant (7)
// and CATEGORY_IDS.events (6). Shaped like real subpackage items
// (gallery_images: {id,src,title}[]) so the listing/detail components don't
// need to special-case dummy vs. CMS data — swap these out (or just remove
// them) once real outlets/venues are added in the CMS.
export const DUMMY_DINING_OUTLETS = [
  {
    id: "dummy-diamond-restaurant",
    slug: "diamond-restaurant",
    title: "The Diamond Restaurant",
    sub_title: "All-day multi-cuisine dining with sweeping views over the Manakamana hills.",
    description:
      "<p>Our signature restaurant serves a thoughtfully curated menu of Nepali, Indian and continental favourites, from a leisurely breakfast spread to a candlelit dinner. Floor-to-ceiling windows frame the surrounding hills, making every table a room with a view.</p>",
    gallery_images: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop",
        title: "The Diamond Restaurant",
      },
    ],
    amenities: [],
  },
  {
    id: "dummy-sunrise-rooftop-lounge",
    slug: "sunrise-rooftop-lounge",
    title: "Sunrise Rooftop Lounge",
    sub_title: "Craft cocktails and small plates against a Himalayan sunset.",
    description:
      "<p>Perched above the property, our rooftop lounge is the place to unwind — hand-crafted cocktails, a curated wine list, and light bites served as the sky turns gold over the hills. Live acoustic sets on select evenings.</p>",
    gallery_images: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1613066697157-e8345495b665?q=80&w=1600&auto=format&fit=crop",
        title: "Sunrise Rooftop Lounge",
      },
    ],
    amenities: [],
  },
  {
    id: "dummy-garden-cafe",
    slug: "garden-cafe",
    title: "Garden Café",
    sub_title: "A relaxed all-day café for coffee, light bites, and afternoon tea.",
    description:
      "<p>Set among the gardens, our café is the easy-going spot for a slow coffee, fresh pastries, or afternoon tea between activities. Open all day, with plenty of shaded outdoor seating.</p>",
    gallery_images: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1504963642567-227b3bbd79de?q=80&w=1600&auto=format&fit=crop",
        title: "Garden Caf\u00e9",
      },
    ],
    amenities: [],
  },
];

export const DUMMY_EVENT_VENUES = [
  {
    id: "dummy-grand-ballroom",
    slug: "grand-ballroom",
    title: "The Grand Ballroom",
    sub_title: "An elegant pillar-free hall for weddings, galas, and large conferences.",
    description:
      "<p>Our largest event space comfortably hosts weddings, galas and large-scale conferences, with a pillar-free floor plan, a dedicated event team, and full audio-visual support.</p>",
    gallery_images: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1675247488725-22d1b78e75db?q=80&w=1600&auto=format&fit=crop",
        title: "The Grand Ballroom",
      },
    ],
    amenities: [],
    size: "2,400 sq.ft",
    u_shape: "80 Pax",
    class_room_style: "120 Pax",
    theater: "220 Pax",
    round_table: "160 Pax",
  },
  {
    id: "dummy-manakamana-conference-hall",
    slug: "manakamana-conference-hall",
    title: "Manakamana Conference Hall",
    sub_title: "A refined boardroom-style space for meetings and corporate retreats.",
    description:
      "<p>A quieter, boardroom-style venue suited to meetings, workshops and corporate retreats, equipped with natural daylight and modern AV equipment.</p>",
    gallery_images: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1505845753232-f74a87b62db6?q=80&w=1600&auto=format&fit=crop",
        title: "Manakamana Conference Hall",
      },
    ],
    amenities: [],
    size: "850 sq.ft",
    u_shape: "30 Pax",
    class_room_style: "40 Pax",
    theater: "60 Pax",
    round_table: "40 Pax",
  },
  {
    id: "dummy-terrace-garden-venue",
    slug: "terrace-garden-venue",
    title: "Terrace Garden Venue",
    sub_title: "An open-air lawn setting for celebrations under the stars.",
    description:
      "<p>An open-air lawn framed by the surrounding hills — ideal for receptions, sundowners and celebrations that call for fresh air and a view.</p>",
    gallery_images: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1758403037080-39e759895454?q=80&w=1600&auto=format&fit=crop",
        title: "Terrace Garden Venue",
      },
    ],
    amenities: [],
    size: "3,000 sq.ft",
    u_shape: "—",
    class_room_style: "—",
    theater: "300 Pax",
    round_table: "200 Pax",
  },
];


export const ROOM_POLICIES = [
  { label: "Check-in", value: "2:00 PM" },
  { label: "Check-out", value: "12:00 PM (noon)" },
  { label: "Cancellation", value: "Free up to 48 hrs before arrival. 1-night charge applies for late cancellations." },
  { label: "Children", value: "All ages welcome. Children under 12 stay free sharing parents' room." },
  { label: "Smoking", value: "Non-smoking property. Designated outdoor smoking areas available." },
  { label: "Payment", value: "Visa, MasterCard and cash (NPR) accepted." },
];

export const ROOM_FAQS = [
  {
    question: "What time is check-in and check-out?",
    answer: "Check-in is at 2:00 PM and check-out is at 12:00 PM. Early check-in and late check-out can be arranged subject to availability — please contact us in advance.",
  },
  {
    question: "Is breakfast included in the room rate?",
    answer: "Yes, complimentary breakfast for two is included with every room. Breakfast is served 7:00 AM – 10:00 AM at Basera Restaurant.",
  },
  {
    question: "Are cable car tickets complimentary?",
    answer: "Yes, all staying guests receive complimentary cable car tickets, allowing easy access between the valley station and Manakamana Temple.",
  },
  {
    question: "Is the swimming pool open year-round?",
    answer: "The outdoor swimming pool is open seasonally (March – November). Sauna and steam facilities are available year-round.",
  },
  {
    question: "Do you offer airport transfers?",
    answer: "Airport transfers can be arranged on request at an additional charge. Please contact us at least 24 hours before your arrival.",
  },
  {
    question: "Can I request a room with a Himalayan view?",
    answer: "Most of our rooms offer panoramic Himalayan views. Please mention your preference at the time of booking and we will do our best to accommodate you.",
  },
  {
    question: "Is there parking at the resort?",
    answer: "Yes, complimentary parking is available on the resort premises for all guests.",
  },
  {
    question: "What is the cancellation policy?",
    answer: "Free cancellation is available up to 48 hours before check-in. A one-night charge applies for cancellations made within 48 hours of arrival.",
  },
];

export const ROOMS: Room[] = [
  {
    images: [
      "/images/placeholder-room-1.webp",
      "/images/placeholder-room-2.webp",
      "/images/placeholder-room-3.webp",
      "/images/placeholder-room-4.webp",
      "/images/placeholder-room-5.webp",
    ],
  },
];

export const menuData = [
  {
    id: "deluxe-room",
    title: "Deluxe Room",
    link: "/rooms-suites/deluxe-room",
  },
  {
    id: "basera-restaurant",
    title: "Restaurant",
    link: "/dining/basera-restaurant",
  },
  {
    id: "service/aila-bar",
    title: "Aila Bar",
    link: "/service/aila-bar",
  },
  {
    id: "#",
    title: "Events",
    link: "/#",
    subLinks: [
      {
        id: "gorkha-hall",
        title: "Gorkha Hall",
        link: "/events-hall/gorkha-hall",
      },
      {
        id: "durbar-hall",
        title: "Durbar Hall",
        link: "/events-hall/durbar-hall",
      },
      {
        id: "chaubis-kothi",
        title: "Chaubis Kothi",
        link: "/events-hall/chaubis-kothi",
      },
    ],
  },
  {
    id: "blog",
    title: "Blog",
    link: "/blog",
  },
  {
    id: "offers",
    title: "Offers",
    link: "/offers",
  },
  {
    id: "#",
    title: "Services",
    link: "/#",
    subLinks: [
      {
        id: "facilities",
        title: "Facilities",
        link: "/facilities",
      },
      {
        id: "service/sauna-steam",
        title: "Sauna & Steam",
        link: "/service/sauna-steam",
      },
      {
        id: "service/fitness-center",
        title: "Fitness Center",
        link: "/service/fitness-center",
      },
      {
        id: "service/outdoor-swimming-pool",
        title: "Swimming Pool",
        link: "/service/outdoor-swimming-pool",
      },
    ],
  },
  {
    id: "gallery",
    title: "Gallery",
    link: "/gallery",
  },
  {
    id: "contact-us",
    title: "Contact",
    link: "/contact-us",
  },
];


/** Site-wide CSS scoped to `.cms-content`, injected once in <head> (see layout.tsx).
 *  DB column: custom_css (not live yet — API should expose it next to `headers`
 *  on the `siteregulars` endpoint, e.g. { "css": "..." }). */
export const CMS_CSS_INJECT = {
  css: ".test-btn {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\r\n  padding: 1rem 2.5rem;\r\n  border: 1px solid var(--luxury-gold);\r\n  color: var(--luxury-gold);\r\n  font-size: 0.75rem;\r\n  letter-spacing: 0.25em;\r\n  text-transform: uppercase;\r\n}",
};