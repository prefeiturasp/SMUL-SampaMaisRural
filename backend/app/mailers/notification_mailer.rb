class NotificationMailer < ApplicationMailer
  add_template_helper(PartnersHelper)
  layout "admin_mailer"

  def notify resource, email
    @resource = resource
    @partner = @resource.try(:partner)
    @resource_name = resource.class.model_name.human
    mail subject: "Novo/a #{ @resource_name } de #{ @resource.name }", to: email
  end
end
