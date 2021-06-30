class Filter < ApplicationRecord
  belongs_to :group, class_name: 'FilterGroup'
  acts_as_taggable_on :tags, :covid

  enum field: %i[subcategory_list zone neighborhood_region_list product_list cultivated_area_range qualification_list tag_list]

  def label
    super || I18n.t("filters.groups.#{ group.subcategory_key }")[field.to_sym] || group.name
  end

  def ordering
    "#{group.subcategory_key}_#{field}"
  end

  def self.filterable_fields
    fields.keys + I18n.t('filters.groups').keys.map { |group_name| fields.keys.map { |field| "#{group_name}_#{field}".to_sym } }.flatten
  end

  def search_data
    { label: label,
      field: field,
      ordering: ordering,
      covid_list: covid_list,
      tag_list: tag_list }
  end
end
