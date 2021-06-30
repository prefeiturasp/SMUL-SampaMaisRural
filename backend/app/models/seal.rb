class Seal < ApplicationRecord
  belongs_to :shareable, polymorphic: true
  belongs_to :seals_group, optional: true
  belongs_to :connected_partner, class_name: "Partner", optional: true

  include Api::SiteHelper
  mount_uploader :qr_code, ImageUploader

  enum kind: %i[sprural partner]
  enum status: %i[active without_connection expired arquived]

  scope :expires_at, -> (expiration_date) { where("date(expires_at) = ?", expiration_date)}

  attr_accessor :metadata

  def self.mark_as_expired
    expires_at(Date.today).update_all(status: statuses[:expired])
  end

  def generate_qr_code!
    QrCode.new(site_url(shareable)).generate do |file|
      self.qr_code = file
    end
  end

  def files
    [file.url, qr_code.url]
  end

  def folder_name
    "#{shareable.name.to_s.gsub("/", "")} - #{id}"
  end

  def zip_filename
    "#{folder_name}.zip"
  end

  def zip_filepath
    Rails.root.join('tmp', zip_filename).to_s
  end

  def folder_path
    Rails.root.join('tmp', folder_name).to_s
  end

  def export_files
    FileUtils.rm_rf(folder_path) if Dir.exists?(folder_path)
    Dir.mkdir(folder_path)
    FileUtils.cp(file.path, folder_path)
    FileUtils.cp(qr_code.path, folder_path)
  end

  def exported_files
    export_files
    folder_path
  end

  def self.as_zip seals
    folder_path = Rails.root.join('tmp', "download-#{SecureRandom.uuid}")
    output = "#{folder_path}.zip"
    Dir.mkdir(folder_path)
    seals.find_each do |seal|
      FileUtils.mv seal.exported_files, folder_path, force: true
    end
    @generator = ZipFileGenerator.new(folder_path, output)
    @generator.write
    output
  end

  def self.as_zip_for shareables
    as_zip(Seal.where(shareable: shareables))
  end

  def as_zip
    FileUtils.rm_rf(zip_filepath) if File.exists?(zip_filepath)
    Zip::File.open(zip_filepath, Zip::File::CREATE) do |zipfile|
      zipfile.add(qr_code.identifier, qr_code.file.path)
      zipfile.add(file.identifier, file.file.path)
    end
    zip_filepath
  end

  def download!
    update_attribute(:last_download_at, Time.zone.now)
    file.path
  end
end
