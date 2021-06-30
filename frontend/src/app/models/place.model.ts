export interface PlacesResult {
  places: Place[];
  total_pages: number;
  current_page: number;
  total_count: number;
}

export interface Phones {
  phone_number: string;
  phone_kind?: string;
}

export class Place {
  id: number;
  name: string;
  source_link: string;
  source_info: string;
  type: string;
  organic: string;
  product_list: Array<string>;
  avatar_url: any;
  commentable?: boolean;
  suggestable: boolean;
  accepts_photos?:boolean;
  commercial_address: string;
  full_address: string;
  lat: number;
  lon: number;
  kind: string;
  associativism: string;
  family_work: string;
  slug: string;
  related_partners: Place[];
  address: string;
  accessible: boolean;
  images: Array<string>;
  description: string;
  web_pages: String[];
  email: string;
  farms_count: number;
  work_season: string;
  open_in_holidays: string;
  rules: string;
  park: string;
  icon: string;
  contact?: string;
  public: boolean;
  tag_list: Array<string>;
  qualification_list: Array<string>;
  disabled_friendly_amenities: string;
  subcategory_list: Array<string>;
  tags_from_subcategories: Array<string>;
  phone: string;
  commercial_phones: Phones[];
  location: string;
  schedule: string;
  area: string;
  cultivated_area_range: string;
  has_avatar?: boolean;
  workers: any;
  certificates: Array<string>;
  source: string;
  updated_at: string;
  where_find_list: Array<string>;
  neighborhood: string;
  utm_coords: boolean;
  detail: string;
  highlight?: boolean;
  other_site_list: Array<string>;
  external_link: string;
};
