class MailNotifier
  def self.notify_about resource
    partner = resource.try(:partner)
    emails = partner.try(:moderator_emails) || User.pluck(:email)
    emails.each do |email|
      NotificationMailer.notify(resource, email).deliver_later
    end
  end
end