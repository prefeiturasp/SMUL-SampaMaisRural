module Taggable
  extend ActiveSupport::Concern

  TAGS =  %i[regions
  tags
  neighborhood_region
  products
  where_finds
  qualifications
  experiences
  foods
  natures
  farmers_with_contacts
  cultures
  civil_societies
  services
  accommodations
  solidary_cities
  urban_gardens
  public_policies
  associations
  researches
  natives
  urban_garden_or_farmers
  gardens_with_equipments
  guarani_natives
  service_with_local_partners
  delivery_fresh_products
  fruit_species]

  TAG_LISTS = TAGS.map { |tag_list| "#{tag_list}_list".to_sym }
  CUSTOM_TAGS = TAG_LISTS.map { |tag_list| "custom_#{tag_list}".to_sym }

  def to_list_name value
    self.class.to_list_name value
  end

  def tag_param_list
    self.class.tags_to_filter.map {|x| { to_list_name(x) => get_tag(x) }}.reduce({}, :merge)
  end

  def get_tag tag_name
    self.send(to_list_name(tag_name))
  end

  def save_activities
    values = activity_list
    return unless values
    values = values.split(/\s*[,;]\s* |\s{2,}|[\r\n]+/x).select {|value| value.present?} if values.is_a?(String)
    return if subcategory_list.count > 1 # pending
    sub_name = self.subcategory_list[0]
    list = I18n.t('subcategory_list').reduce({}, :merge).invert[sub_name]
    list = (list ? list.to_s.singularize + "_list" : "tag_list")
    values.each do |value|
      self.send(list).add(value)
    end
  end

  def tags_from_subcategories
    I18n.t('subcategory_list').reduce({}, :merge).keys.map { |sub| send("#{sub.to_s.singularize}_list") }.flatten
  end

  class_methods do
    def tag_list except: []
      %i[regions tags neighborhood_region products where_finds qualifications] + I18n.t('subcategory_list').reduce({}, :merge).keys.map(&:to_s).map(&:pluralize).map(&:to_sym) + category_tags_list - except
    end

    %i[subcategories qualifications products fruit_species where_finds].each do |tag_context|
      define_method("with_#{tag_context.to_s.pluralize}") do |values|
        tagged_with(values, any: true, on: tag_context)
      end
    end

    def ransackable_scopes(auth_object = nil)
      %i[subcategories qualifications products fruit_species where_finds]
        .map {|tag_context| "with_#{tag_context.to_s.pluralize}" }
    end

    def tag_attribute_list
      tag_list.map { |tag_name| (to_list_name(tag_name)).to_sym }
    end

    def general_tags
      %i[regions tags neighborhood_region products where_finds]
    end

    def tags_to_filter
      (tag_list(except: %i[tags urban_gardens gardens_with_equipments guarani_natives delivery_fresh_products urban_garden_or_farmers]))
    end

    def tag_filter_list
      case name
      when "Upa"
        %i[subcategories products where_finds qualifications].map { |n| to_list_name(n) }
      when "Tourism"
        tags_to_filter.map { |n| to_list_name(n) }
      when "Market"
        tags_to_filter.map { |n| to_list_name(n) }
      when "Initiative"
        %i[subcategories researches civil_societies association public_policies].map { |n| to_list_name(n) }
      else
        []
      end
    end

    def category_tags_list
      %i[fruit_species]
    end

    # TODO move me from here
    def to_list_name value
      (value.to_s.singularize + '_list').to_sym
    end

    def tag_list_by taggings
      ActsAsTaggableOn::Tag.joins(:taggings)
        .where(taggings: taggings.merge(taggable_id: self.pluck(:id)))
        .pluck(:name).uniq
    end
  end
end
