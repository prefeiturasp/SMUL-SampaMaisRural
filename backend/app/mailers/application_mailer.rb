class ApplicationMailer < ActionMailer::Base
  default from: Rails.application.secrets.email_sender
  layout 'mailer'
end
