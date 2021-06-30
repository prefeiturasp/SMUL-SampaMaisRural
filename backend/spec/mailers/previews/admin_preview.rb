# Preview all emails at http://localhost:3000/rails/mailers/partner
class AdminPreview < ActionMailer::Preview
  def partner_created
    AdminMailer.partner_created(Partner.last, User.last.email)
  end
end
