class Suggestion < ApplicationRecord
  has_many :attachments, as: :attachmentable, dependent: :destroy
  belongs_to :suggestable, polymorphic: true
  enum status: %i[pending approved refused]

  accepts_nested_attributes_for :attachments, allow_destroy: true

  validates :name, :email, :suggestable, presence: true
  validates :message, presence: true, if: -> { attachments.empty? }

  before_validation :save_type
  attr_accessor :status_message
  after_validation :notify
  after_commit :notify_creation, on: :create

  class << self
    def creation_attributes
      all_params << Attachment.file_params
    end

    def update_params
      %i[status]
    end

    def all_params
      %i[
      suggestable_name
      suggestable_id
      suggestable_type
      name
      status
      email
      phone
      message]
    end
  end

  def suggestable_name
    suggestable.name
  end

  def notifiable_name
    suggestable_name
  end

  def suggestable_api_id
    suggestable&.api_id
  end

  def detail
    message
  end

  def partner
    suggestable
  end

  private

  def save_type
    return unless suggestable_id
    partner = Partner.find(suggestable_id)
    self.suggestable_type = partner.class.name
  end

  def notify
    return unless self.persisted?
    PartnerMailer.status_changed(suggestable_id, self, status_message, email, status).deliver_later if status_changed? and status_message.present?
  end

  def notify_creation
    MailNotifier.notify_about self
  end
end
