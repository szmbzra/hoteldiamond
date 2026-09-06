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
  label: "Quality. Comfort. Care",
  title: "Why Choose Us",
  description:
    "There's so much to Discover. The best prices for your relaxing vacation. Every stay here is not just a vacation—but a memory in the making.",
};

export const DINE_DATA = {
  label: "Premium Service",
  title:
    "Offering panoramic views of the majestic Himalayas with our delicious catering service which please your gourmet",
  link: "/basera-restaurant",
  linkText: "Explore",
  image: "/images/placeholder-dine.webp",
};

export const SERVICES_HEADER = {
  label: "Relax. Refresh. Rejuvenate",
  title: "Our Services",
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
  label: "Hillcrest Blog",
  title: "Latest News",
};

// ============================================================
// EXISTING DATA ARRAYS — preserved exactly as-is
// ============================================================

export const LANDMARKS: Landmark[] = [
  {
    id: "manakamana-temple",
    tab: "Manakamana Temple",
    title: "Manakamana Temple",
    subtitle: "Ancient Temple of Fulfilled Desires",
    content: 'Manakamana Temple sits peacefully on a hill and is one of Nepal\'s most respected religious sites. It\'s dedicated to Goddess Bhagwati and offers beautiful views of the valleys and Himalayas. Many visitors come here to feel the spiritual energy and enjoy the calm surroundings. The name "Manakamana" means "wish of the heart," symbolizing hope and devotion.',
    distance: "240 m",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3525.953482981846!2d84.5815912247255!3d27.90340077607072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x39951f0004390a0f%3A0x7c2164964f8c3196!2sManakamana%20Hillcrest%20Resort%2C%20WH3M%2B3WQ%2C%20Manakamana!3m2!1d27.9027045!2d84.5848547!4m5!1s0x39951f36313173a1%3A0x419b37da0e2d746a!2sManakamana%20Temple%2C%20Manakamana!3m2!1d27.9042125!2d84.58404689999999!5e0!3m2!1sen!2snp!4v1761803072466!5m2!1sen!2snp",
  },
  {
    id: "cable-car",
    tab: "Manakamana Cable Car",
    title: "Manakamana Cable Car",
    subtitle: "A Scenic Journey Above the Hills",
    content: "The Manakamana Cable Car is one of Nepal's most popular attractions, offering an unforgettable 10-minute ride from Kurintar to the hilltop temple. As you ascend over the Trishuli River and forested hills, breathtaking views unfold beneath you. It's a smooth, safe, and scenic experience ideal for pilgrims and sightseers alike.",
    distance: "450 m",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d3525.968631473595!2d84.58268607547436!3d27.90293592607103!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x39951f0004390a0f%3A0x7c2164964f8c3196!2sManakamana%20Hillcrest%20Resort%2C%20WH3M%2B3WQ%2C%20Manakamana!3m2!1d27.9027045!2d84.5848547!4m5!1s0x39951ff13463019f%3A0xd6ab14bddfcdc211!2sManakamana%20Cable%20Car%2C%20Manakamana%20Cable%20Car%2C%20Manakamana!3m2!1d27.903412399999997!2d84.5854746!5e0!3m2!1sen!2snp!4v1761806796508!5m2!1sen!2snp",
  },
  {
    id: "siddha-cave",
    tab: "Gorakhnath Siddha Cave",
    title: "Gorakhnath Siddha Cave",
    subtitle: "A Sacred Meditation Site",
    content: "Located near Manakamana Temple, Gorakhnath Cave is dedicated to the revered sage Gorakhnath, who is believed to have meditated here centuries ago. The site offers a tranquil and spiritual environment, allowing visitors to experience Nepal's mystical traditions while enjoying serene views of the surrounding hills.",
    distance: "2.2 km",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d14102.888529586282!2d84.57893589345024!3d27.91049916706307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x39951f0004390a0f%3A0x7c2164964f8c3196!2sManakamana%20Hillcrest%20Resort%2C%20WH3M%2B3WQ%2C%20Manakamana!3m2!1d27.9027045!2d84.5848547!4m5!1s0x399519f68a2a7a21%3A0x9ebc3b405e0a62f!2sGorakhnath%20Siddha%20Cave%2C%20WH9V%2B9G7%2C%20Bakrang!3m2!1d27.918409999999998!2d84.59378509999999!5e0!3m2!1sen!2snp!4v1761806904458!5m2!1sen!2snp",
  },
  {
    id: "lakhan-thapa-cave",
    tab: "Lakhan Thapa Cave",
    title: "Lakhan Thapa Cave",
    subtitle: "The Origin of Faith",
    content: "Named after Lakhan Thapa, the first priest of Manakamana Temple, this cave holds deep historical and cultural significance. It is believed that Goddess Manakamana first appeared here, marking the beginning of the temple's spiritual story. The short trail leading to the cave is perfect for guests who enjoy nature walks combined with local legend.",
    distance: "2.3 km",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d11744.770057542326!2d84.58795050458559!3d27.916745166435803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x39951f0004390a0f%3A0x7c2164964f8c3196!2sManakamana%20Hillcrest%20Resort%2C%20WH3M%2B3WQ%2C%20Manakamana!3m2!1d27.9027045!2d84.5848547!4m5!1s0x399519a83b0d4a2f%3A0x998e95a2c5707a0b!2sSidhha%20lakhan%20thapa%20cave%2C%20WHCW%2B9H9%2C%20Bakrang!3m2!1d27.920903799999998!2d84.5964858!5e0!3m2!1sen!2snp!4v1761803438308!5m2!1sen!2snp",
  },
  {
    id: "bakreshwor",
    tab: "Bakreshwor Mahadev Temple",
    title: "Bakreshwor Mahadev Temple",
    subtitle: "Serenity in the Hills",
    content: "Just a short hike from the main temple area, Bakreshwor Mahadev Temple is a peaceful spiritual spot surrounded by lush greenery. It is dedicated to Lord Shiva and provides a calm retreat for meditation and reflection. The scenic walk to the temple also offers a chance to admire the natural beauty of the Manakamana region.",
    distance: "2.3 km",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d17598.33939342822!2d84.58494353532969!3d27.91018880469049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x39951f0004390a0f%3A0x7c2164964f8c3196!2sManakamana%20Hillcrest%20Resort%2C%20WH3M%2B3WQ%2C%20Manakamana!3m2!1d27.9027045!2d84.5848547!4m5!1s0x39951913f906d1bb%3A0xd38af16a810bb1e7!2sBakreshori%20Temple%2C%20WH9V%2B9XJ%2C%20Bakrang!3m2!1d27.9184591!2d84.5948827!5e0!3m2!1sen!2snp!4v1761803189331!5m2!1sen!2snp",
  },
  {
    id: "bharatpur-airport",
    tab: "Bharatpur Airport",
    title: "Bharatpur Airport",
    subtitle: "Gateway to the Hills",
    content: "Located approximately 67.9 km from the resort, Bharatpur Airport serves as the nearest air connection for guests traveling from Kathmandu or Pokhara. The scenic drive from the airport to Manakamana takes about an hour, following the picturesque Trishuli River and offering glimpses of rural life and green hills along the way.",
    distance: "67.9 km",
    map_url:
      "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d225855.8756642616!2d84.34240540570418!3d27.80983068125511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x39951f0004390a0f%3A0x7c2164964f8c3196!2sManakamana%20Hillcrest%20Resort%2C%20WH3M%2B3WQ%2C%20Manakamana!3m2!1d27.9027045!2d84.5848547!4m5!1s0x3994fb28bdc01095%3A0xe3a546b17da5024d!2sBharatpur%20Airport%2C%20Bharatpur!3m2!1d27.6785769!2d84.4296105!5e0!3m2!1sen!2snp!4v1761805603200!5m2!1sen!2snp",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    title: "Great stay with friends!",
    content:
      "Visited Hotel Diamond Pvt. Ltd with friends and had a great time. Reaching the hotel was super easy thanks to the complimentary cable car, which was a really nice experience. The rooms were clean and comfortable, the views were beautiful, and the atmosphere was very relaxing. Staff were friendly and helpful throughout our stay, and the food was good too. Overall, a perfect place to stay with friends. Would definitely recommend!",
    author: "James G",
    source: "Tripadvisor",
  },
  {
    title: "Hotel Diamond Pvt. Ltd - Manakamana, Nepal",
    content:
      "This is definitely one of the best hotels we have stayed in Nepal. Location of this 4 star hotel located in Manakamana is excellent. Walk to the Manakamana temple is just a few minutes away. Hotel provides you free cable car tickets and picks you and your luggage from the station below. Customer service was excellent. Rooms were clean and spotless with great views. Complimentary sauna and breakfast is included in package...",
    author: "Falcha",
    source: "Tripadvisor",
  },
  {
    title: "Holiday ❘ Family",
    content:
      "The stay was amazing with amazing views. The hospitality there was like no other hotels. Another good thing about the hotel is that you have priority boarding for cable car (no line). Would recommend 10/10.",
    author: "Aditya maharjan",
    source: "Google",
  },
  {
    title: "Holiday ❘ Friends",
    content:
      "This is one of the best hotels in Manakamana Hill. The staff are very friendly and welcoming. I personally highly recommend this place. We were a group of 42 people and booked 21 rooms, and the service was excellent throughout our stay. Everything was perfect. You must visit and stay here.",
    author: "Prakash Dhakhwa",
    source: "Google",
  },
  {
    title: "Holiday ❘ Family",
    content:
      "We had a lovely stay with our daughter. The staff were very kind and welcoming, and the room was clean and comfortable. Everything felt easy and family-friendly. Thank you for making our stay so special we would definitely come back again!",
    author: "Sunil Thapa",
    source: "Google",
  },
  {
    title: "Holiday ❘ Couple",
    content:
      "Hotel Diamond Pvt. Ltd is one of the best hotels to stay at in the Manakamana area. We had a wonderful experience at this beautiful property. The staff—Rup Maya, Muskan, Sandesh, and Dubisha—were outstanding and provided exceptional hospitality throughout our stay.",
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
    link: "/restaurant/basera-restaurant",
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