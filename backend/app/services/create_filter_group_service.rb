class CreateFilterGroupService
  attr_reader :partner, :category

  def initialize partner
    @partner = partner.to_api
    @category = partner.type
  end

  def create_groups
    filters.each do |field|
      group = FilterGroup.
        find_or_initialize_by(name: I18n.t("filters.#{category.downcase}.#{field}"),
                              category: category)
      group.save
      create_filter({ group_id: group.id, field: field }, partner)
    end
    return if partner.subcategory_list.size > 1
    partner.subcategory_list.each do |subcategory_name|
      group = FilterGroup.find_or_initialize_by(name: group_name(subcategory_name),
                                                category: category)
      next if group.name.nil?
      group.save
      filters_by(subcategory_name)
        .map { |field| create_filter({ group_id: group.id, field: field }, partner) }
    end
  end

  def create_filter data, partner
    filter = Filter.find_or_initialize_by(data)
    filter.tag_list = filter.tag_list + partner.filterable_values_for(data[:field])
    filter.covid_list = filter.covid_list + partner.filterable_values_for(data[:field]) if partner.covid?
    filter.save
  end

  def group_name subcategory_name
    subcategory = I18n.t('subcategories').invert[subcategory_name]
    data = I18n.t('filters.groups')[subcategory]
    data[:name] if data
  end

  def filters
    data = case category
           when "Tourism"
             %i[neighborhood_region_list qualification_list]
           when "Initiative"
             %i[zone qualification_list]
           when "Market"
             %i[zone qualification_list]
           else
             %i[zone]
           end
    %i[subcategory_list] + data
  end

  def filters_by subcategory_name
    case I18n.t('subcategories').invert[subcategory_name]
    when :farmers_with_contact
      %i[product_list cultivated_area_range qualification_list]
    when :farmers_without_contact
      %I[product_list]
    when :guarani
      %i[product_list qualification_list]
    when :urban_gardens
      %i[product_list qualification_list]
    when :gardens_with_public_equipaments
      %i[product_list qualification_list]
    when :rural_experience
      %i[product_list]
    when :nature
      %i[product_list]
    when :culture
      %i[product_list]
    when :food
      %i[product_list]
    when :accommodation
      %i[product_list]
    when :services
      %i[product_list]
    when :local_production_partner
      %i[product_list]
    when :local_production_partner
      %i[product_list]
    when :restaurants_with_organic_ingredients
      %i[tag_list]
    when :free_markets
      %i[tag_list]
    when :agriculture_services
      %i[product_list]
    when :public_policies
      %i[product_list]
    when :civil_society
      %i[product_list]
    when :associations_cooperatives
      %i[product_list]
    when :research
      %i[product_list]
    else
      %i[product_list]
    end
  end
end
