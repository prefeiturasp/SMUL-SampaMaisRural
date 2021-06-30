# Preview all emails at http://localhost:3000/rails/mailers/partner
class PartnerPreview < ActionMailer::Preview
  def status_changed
    PartnerMailer.status_changed(Partner.last.id,
                                 Partner.last,
                                 "Olá Jhon Doe \n \n sua inclusão de local  - Produtor Agrícola foi realizada com sucesso na Sampa+Rural. Confira",
                                 "foo@bar.com",
                                "approved")
  end
end
