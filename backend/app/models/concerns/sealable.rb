module Sealable
  extend ActiveSupport::Concern

  included do
    after_commit :schedule_seal, if: :generate_seal?
  end

  def generate_seal?
    category.present? && public_subcategory_list.any?
  end

  def download_seal?
    generate_seal? and seal.present?
  end

  def generate_seal
    return unless category
    self.seal&.destroy
    seal = create_seal
    seal.generate_qr_code!
    seal.metadata = Metadata::Content.new(metadata_options(seal))
    seal.file = category.seal&.file
    seal.save
  end

  private

  def metadata_options seal
    shareable = to_api
    [
      Metadata::Process.new(Metadata::SEAL[:title], shareable.public_subcategory_list.join("\n")),
      Metadata::Process.new(Metadata::SEAL[:content], "#{shareable.name} \n #{full_address}"),
      Metadata::Process.new(Metadata::SEAL[:bottom], shareable.district),
      Metadata::Process.new(Metadata::SEAL[:image], seal.qr_code.path)
    ]
  end

  def schedule_seal
    GeneratePartnerSealJob.perform_now(self)
  end
end
