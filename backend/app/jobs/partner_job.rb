class PartnerJob < ApplicationJob
  queue_as :default
  
  def perform partner
    partner.reindex
  end
end