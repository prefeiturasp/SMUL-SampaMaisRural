# Preview all emails at http://localhost:3000/rails/mailers/notification
class NotificationPreview < ActionMailer::Preview

  def notify
    NotificationMailer.notify(Suggestion.last)
  end
end
