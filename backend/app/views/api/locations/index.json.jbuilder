json.array! @partners.each do |category, places|
  json.name category.downcase
  json.places places do |partner|
    json.id partner.id
    json.name partner.name
    json.type partner.type.downcase
    json.slug partner.slug
    json.subcategory_list partner.subcategory_list
    json.related_partner_slugs partner.related_partner_slugs
    json.product_list partner.visible_product_list
    json.qualification_list partner.qualification_list
    json.full_address partner.resume_address
    json.lat partner.location.lat
    json.lon partner.location.lon
    json.icon partner.icon
  end
end
