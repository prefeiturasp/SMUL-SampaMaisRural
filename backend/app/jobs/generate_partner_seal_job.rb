class GeneratePartnerSealJob < ApplicationJob
  queue_as :default

  def perform(partner)
    partner.generate_seal
  end
end
