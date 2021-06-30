class SealsGroup < ApplicationRecord
  has_many :seals, class_name: 'RegularSeal'

  accepts_nested_attributes_for :seals

  attr_accessor :partner_id,
    :additional_seals,
    :connected_partner_ids,
    :expires_at,
    :detail

  validates :partner_id, :expires_at, presence: true

  after_validation :generate_additional_seals

  validates :partner_id, presence: true
  validate :expires_at_cannot_be_in_the_past

  def partner
    @partner ||= Partner.find partner_id
  end

  def connected_partners
    Partner.where(id: connected_partner_ids)
  end

  private

  def generate_additional_seals
    seals_to_generate = additional_seals.to_i
    seals_to_generate += 1 if connected_partners.blank?

    connected_partners.each do |connected_partner|
      seals.build(shareable: partner, 
                  connected_partner: connected_partner,
                  expires_at: expires_at,
                  detail: detail,
                  status: :active)
    end
    seals_to_generate.times do
      seals.build(shareable: partner,
                 expires_at: expires_at,
                 detail: detail,
                 status: :without_connection)
    end
  end

  def expires_at_cannot_be_in_the_past
    if expires_at.present? && Date.parse(expires_at) < Date.today
      errors.add(:expires_at, "can't be in the past")
    end
  end
end
