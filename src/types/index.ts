export interface Landmark {
  id: string;
  tab: string;
  title: string;
  subtitle: string;
  content: string;
  distance: string;
  map_url: string;
}

export interface Testimonial {
  title: string;
  content: string;
  author: string;
  source: string;
}

export interface NewsItem {
  category: string;
  date: string;
  title: string;
  desc: string;
  image: string;
  link: string;
}

export interface Service {
  title: string;
  desc: string;
  link: string;
  image: string;
}

export interface Facility {
  title: string;
  desc: string;
  icon: string;
}

export interface Room {
  images: string[];
}

export interface NavItem {
  id: string;
  title: string;
  link: string;
  /** CMS link type: "0" → internal route, "1" → external URL (opens in a new tab). */
  linktype?: string | number;
  subLinks?: NavItem[];
}

export interface MenuContainer {
  type: string | number;
  items: NavItem[];
}

export interface HeroSlide {
  id: number;
  label: string;
  title: string;
  highlight: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export interface PackageFeature {
  img?: string;
  name: string;
}
 
export interface Package {
  id: string;
  slug: string;
  title: string;
  sub_title?: string;
  fb_img?: string;
  img: string[];
  description?: string;
  inclusions?: string | string[];
  check_in?: string | string[];
  check_out?: string | string[];
  special_instructions?: string;
  children_policy?: string | string[];
  features?: PackageFeature[];
  book_url?: string;
}
 
export interface ApiResponse {
  parent_id?: string;
  items?: Package[];
}

export interface NewsData {
  title: string;
  image: string;
  banner_image: string;
  date: string;
  author: string; 
  content: string;
  slug: string;
}