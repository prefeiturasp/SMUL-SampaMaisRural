class PartnerForm < SimpleDelegator
  include ActiveModel::Model

  def initialize partner
    __setobj__(partner)
  end

  Partner::TAGS.each do |tag_name|
    define_method("custom_#{tag_name.to_s.pluralize}=") do |tag_values|
      return if update_via_integration_changed?
      existing_ids = tag_values.map { |value| value['id'] }.compact
      self.send(tag_name).where(id: existing_ids).where.not(name: tag_values.map { |value| value['name'] }).destroy_all
      values = (self.send("#{tag_name.to_s.singularize}_list") + tag_values.map { |value| value['name'] }.flatten)
      self.send("#{tag_name.to_s.singularize}_list=", values)
    end

    define_method("#{tag_name.to_s.singularize}_list=") do |tag_values|
      return if update_via_integration_changed?
      super tag_values
    end
  end

  def subcategory_list= values
    values = values.delete_if { |x| x.blank? }
    return if update_via_integration_changed? || values.blank?
    super values
  end

  def certificate_list= values
    values = values.delete_if { |x| x.blank? }
    return if update_via_integration_changed? || values.blank?
    super values
  end

  def category_name
    category.name
  end
end
