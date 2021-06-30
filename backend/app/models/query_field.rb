class QueryField < Struct.new(:field, :values)
  def for? subcategory_name
    group_name.nil? or group_name == group_for(subcategory_name)
  end

  def group_for subcategory_name
    sub = I18n.t('subcategories').invert[subcategory_name]
    I18n.t('filters.groups')[sub].try(:dig, :name)
  end

  def group_name
    sub = I18n.t('filters.groups').keys.select { |s| field.include?(s.to_s) }[0]
    I18n.t('subcategories')[sub]
  end

  def to_query
    { translated_field => values }
  end

  private

  def translated_field
    Filter.fields.keys.select { |f| field.include?(f) }[0] || field
  end
end

