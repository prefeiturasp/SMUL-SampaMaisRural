class FilterGroup < ApplicationRecord
  searchkick

  has_many :filters, foreign_key: 'group_id', dependent: :destroy
  accepts_nested_attributes_for :filters

  def label
    "#{category.constantize.model_name.human} #{ name }"
  end

  def subcategory_key
    I18n.t('subcategories').invert[name]
  end

  def search_data
    { name: name,
      category: category.downcase,
      subcategory_key: subcategory_key,
      filters: filters.map(&:search_data) }
  end
end
