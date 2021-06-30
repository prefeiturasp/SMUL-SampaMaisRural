class Post < ApplicationRecord
  mount_uploader :photo, AttachmentUploader
  mount_uploader :file, FileUploader
  has_and_belongs_to_many :themes, class_name: "PostTheme"

  validates :title, :theme_ids, presence: true

  validates_length_of :description, maximum: 245, allow_blank: false

  def self.all_params
    %i[title description photo file link] << { theme_ids: [] }
  end

  def theme_list
    themes.map(&:name)
  end
end
