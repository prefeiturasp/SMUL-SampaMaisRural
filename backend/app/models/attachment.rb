class Attachment < ApplicationRecord
  mount_uploader :file, AttachmentUploader
  validates :file, presence: true
  before_save :order!
  default_scope { order(:position) }

  enum origin: %i[api local]
  include Sourceable

  scope :report, -> { where(attachmentable_type: nil, attachmentable_id: nil) }

  def self.file_params
    { attachments_attributes: [:file, :id, :_destroy] }
  end

  def self.url
    all.map(&:file).map(&:site).map(&:url)
  end

  def site_version_url
    file&.site&.url
  end

  private
  def order!
    self.position = AttachmentMetadata.new(file.file.filename).position
  end
end
