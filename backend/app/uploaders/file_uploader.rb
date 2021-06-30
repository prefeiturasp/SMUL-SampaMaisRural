class FileUploader < CarrierWave::Uploader::Base
  include Uploable
  storage :file

  def filename
    "#{original_filename}" if original_filename.present?
  end
end
