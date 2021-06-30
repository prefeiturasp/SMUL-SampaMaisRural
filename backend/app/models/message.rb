class Message < ApplicationRecord
  validates :name, :email, :phone, :message, presence: true

  after_commit :notify, on: :create
  enum status: %i[pending answered refused]

  def self.creation_attributes
    %i[name email phone message]
  end

  private

  def notify
    MailNotifier.notify_about self
  end
end
