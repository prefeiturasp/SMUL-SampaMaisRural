class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  include Uploable

  storage :file
end
