class AdminMailer < ApplicationMailer
  layout "admin_mailer"
  add_template_helper(PartnersHelper)


  def partner_created partner, email
    @moderator = User.find_by email: email
    @partner = partner
    mail subject: "Novo parceiro cadastrado no Sampa+Rural", to: email
  end
end
