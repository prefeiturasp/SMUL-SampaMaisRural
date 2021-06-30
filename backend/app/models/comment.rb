class Comment < ApplicationRecord
  include StatusEnum
  belongs_to :partner
  attr_accessor :status_message
  after_validation :notify
  after_commit :notify_creation, on: :create

  validates :name, :email, :data, :partner_id, presence: true

  def self.creation_attributes
    %i[name email data partner_id]
  end

  def notifiable_name
    partner_name
  end

  def partner_name
    partner&.name
  end

  def partner_api_id
    partner&.api_id
  end

  def detail
    data
  end

  def message
    data
  end

  private

  def notify
    return unless self.persisted?
    PartnerMailer.status_changed(partner_id, self, status_message, email, status).deliver_later if status_changed? and status_message.present?
  end

  def notify_creation
    MailNotifier.notify_about self
  end
end
