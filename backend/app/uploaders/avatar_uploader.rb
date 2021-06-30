class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  include Uploable
  storage :file

  version :site do
    process :resize_to_limit => [996, 636]
    process :quality => 75
  end
end
