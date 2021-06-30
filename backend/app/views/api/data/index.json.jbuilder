json.array! @partners do |partner|
  partner.publishable_params.each do |attr|
    json.set! attr, partner.send(attr)
  end
end
