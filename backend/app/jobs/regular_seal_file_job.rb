class RegularSealFileJob < ApplicationJob
  queue_as :default

  def perform(seal)
    seal.generate_qr_code!
    seal.file = File.open('public/sp_rural_seal.png')
    seal.save
  end
end
