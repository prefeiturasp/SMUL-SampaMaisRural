class Category < ApplicationRecord
  has_many :partners
  has_one :seal, as: :shareable, class_name: 'PartnerSeal', dependent: :destroy
  has_many :subcategories, through: :partners

  Types = [
    { name: :farmers, type: :upa },
    { name: :upa, type: :upa },
    { name: :tourism, type: :tourism },
    { name: :rural_experience, type: :tourism },
    { name: :market, type: :market },
    { name: :integrated_market, type: :market },
    { name: :initiative, type: :initiative }
  ]

  def self.all_types
    Types.map {|kind| kind[:type]}.uniq.map(&:to_s)
  end

  def subcategory_list
    subcategories.group(:id).pluck(:name)
  end
end
