class Connection < ApplicationRecord
  has_and_belongs_to_many :partners, join_table: :connections_partners
  accepts_nested_attributes_for :partners

  attribute :root_partner_id, :string
  attribute :partner_id, :string

  before_save :save_partners
  after_commit :reindex_partners

  def self.permitted_params
    [:id, :description, :root_partner_id, :partner_id, :_destroy]
  end

  def reindex_partners
    partners.map(&:reindex)
  end

  def save_partners
    self.partner_ids = (partner_ids + [partner_id]).uniq if partner_id
  end

  def partner_id
    super || (partners.where.not(id: root_partner_id).last&.id)
  end
end
