module Publishable
  extend ActiveSupport::Concern

  class_methods do
    def publishable_attributes
      %i[id
      family_work
      name
      email
      source
      slug
      avatar_url
      disabled_friendly_amenities
      associativism
      references
      park
      zone
      type
      description
      subcategory_list
      region_list
      source_info
      source_link
      neighborhood_region_list
      web_pages
      where_find_list
      product_list
      farms_count]
    end
  end
end
