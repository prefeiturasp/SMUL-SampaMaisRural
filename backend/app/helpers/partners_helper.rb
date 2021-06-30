module PartnersHelper
  def partner_url partner
    I18n.t('routes')[partner_url_key(partner).pluralize.to_sym]
  end

  def certificates_for partner
    if partner.public?
      partner.certificates.as_json(only: [:name, :attachment])
    else
      []
    end
  end

  private
  def partner_url_key partner
    return "agriculture" if partner.agriculture?
    return "integrated_market" if partner.idec? or partner.geosampa?
    return "rural_experience" if partner.rural_experience?
    partner.type.downcase.to_s
  end
end
