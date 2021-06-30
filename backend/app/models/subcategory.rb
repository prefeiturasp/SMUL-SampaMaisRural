class Subcategory < ApplicationRecord
  has_and_belongs_to_many :partners
  include Taggable
  extend Translatable

  has_many :attachments, as: :attachmentable, dependent: :destroy
  accepts_nested_attributes_for :attachments, allow_destroy: true

  scope :is_public, -> { where(is_public: true) }

  enum address_publication: %i[full_address_everywhere full_address_only_on_show only_resume_address]
  acts_as_taggable_on tag_list

  class << self
    def add_to resource, subcategories_name
      subcategories_name = subcategories_name.split(/;|,/) if subcategories_name.is_a?(String)
      subcategories_name = translate_list(subcategories_name.map(&:strip)).select { |sub_name| sub_name.present? }
      subcategories = []
      subcategories_name.each do |sub_name|
        subcategories << Subcategory.where("lower(name) = ?", sub_name.downcase).first_or_initialize(name: sub_name)
      end
      resource.subcategories = subcategories
    end

    def tags_for subcategories, context
      ActsAsTaggableOn::Tag.joins(:taggings).
        where(taggings: { taggable_id: subcategories.pluck(:id),
                          taggable_type: name,
                          context: context })
    end

    def tag_list_for subcategories, context
      tags_for(subcategories, context).pluck(:name).uniq
    end
  end
end
