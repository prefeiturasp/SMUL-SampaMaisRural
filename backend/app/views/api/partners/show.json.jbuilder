@partner.publishable_params.each do |attr, value|
  json.set! attr, value
end
json.has_avatar @partner.has_avatar?
json.product_list @partner.visible_product_list
json.suggestable @partner.suggestable?
json.commentable @partner.commentable?
json.accepts_photos @partner.public?
json.icon @partner.icon
json.lat @partner.lat
json.lon @partner.lon
json.where_find_list @partner.where_find_list
json.schedule @partner.schedule
json.source_info @partner.source_info
json.source_link @partner.source_link
json.images @partner.attachments_list
json.accessible @partner.accessible?
json.full_address @partner.address
json.public @partner.public?
json.external_link @partner.external_link
json.certificates certificates_for @partner
json.related_partners do
  json.array! @partner.connections do |connection|
    partner = connection.partners.where.not(id: @partner.id).last.to_api
    json.slug partner.slug
    json.name partner.name
    json.type partner.type
    json.connection_type connection.description
    json.avatar_url partner.avatar_url
    json.subcategory_list partner.subcategory_list
    json.related_partner_slugs partner.related_partner_slugs
  end
end
