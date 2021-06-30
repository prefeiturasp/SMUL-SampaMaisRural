json.total_count @partners.total_count
json.places do
  json.array! @partners do |partner|
    json.set! partner.id, partner.related_partner_ids
  end
end
