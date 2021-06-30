if Rails.env.production? || Rails.env.staging?
  Rails.application.config.middleware.use ExceptionNotification::Rack,
    email: {
    email_prefix: "[OOPS] SAMPA RURAL (#{Rails.env}) - ",
    sender_address: Rails.application.secrets.email_sender,
    exception_recipients: [ENV['NOTIFICATION_EMAIL']]
  }
end
