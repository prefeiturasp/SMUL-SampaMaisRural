class PartnerMailer < ApplicationMailer
  def status_changed partner_id, resource, message, email, status
    @partner = Partner.find partner_id
    @message = message
    @resource = resource
    @status = status
    mail subject: "Retorno Sampa+Rural", to: email
  end
end
