json.total_count @total_count
json.total_pages @total_pages
json.current_page @current_page
json.places do
  json.array! @partners do |partner|
    json.id partner.id
    json.avatar_url partner.avatar_url
    json.icon partner.icon
    json.slug partner.slug
    json.name partner.name
    json.has_avatar partner.has_avatar
    json.type partner.type.downcase
    json.product_list partner.visible_product_list
    json.subcategory_list partner.subcategory_list
    json.qualification_list partner.qualification_list
    json.schedule partner.resume_schedule
    json.full_address partner.resume_address
  end
end
