json.name @report.name
json.slug @report.slug
json.description @report.description
json.partners do
  json.array! @report.partners do |partner|
    @report.attributes.each do |attribute|
      json.set! attribute.label, partner.send(attribute.field)
    end
  end
end
