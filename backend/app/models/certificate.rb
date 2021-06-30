class Certificate < ApplicationRecord
  has_and_belongs_to_many :partners, join_table: :certificates_partners

  mount_uploader :attachment, FileUploader

  after_commit :reindex_partners

  def self.import certificate_names
    certificate_names = certificate_names.split(/;|,/) if certificate_names.kind_of?(String)
    Set.new(certificate_names).select { |n| n.present? }.map { |n| where("lower(name) = ?", n.to_s.downcase).first_or_initialize(name: n) }
  end

  private

  def reindex_partners
    self.partners.reindex
  end
end
