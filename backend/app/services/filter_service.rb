class FilterService

  def initialize(category, partners, sub_categories, covid = false)
    @category = CategoryFilter.new(category, partners.to_a.size)
    regular_groups = "Api::#{category.camelcase}".constantize.send(:filters)
    # TODO refactor
    if sub_categories == ["Feiras Livres Municipais"]
      regular_groups -= [:qualification_list]
    end
    group_names = regular_groups.map { |name| I18n.t("filters.#{category.downcase}.#{name}") }
    group_names +=  (sub_categories.any? ? sub_categories : I18n.t('subcategories').values).
      map { |name| group_name(name) }
   filters_query = { category: @category.name }
   filters_query.merge!(_or: [{name: group_names}, {"filters.field" => [:subcategory_list, :zone]}]) if group_names.any?

   filter_groups = FilterGroup.search('*', where: filters_query, load: false)

    filters_list = I18n.t("filters.ordering.#{@category.name}")
    filter_groups.each do |group|
      group.filters.each do |filter|
        filter_index = filters_list.index(filter.ordering) || filters_list.size
        api_filter = Api::Filters::Filter.
          new(category: category, filter: filter, covid: covid)
        @category.filters[filter_index] = api_filter if api_filter.values.any?
      end
    end
  end

  def group_name subcategory_name
    subcategory = I18n.t('subcategories').invert[subcategory_name]
    data = I18n.t('filters.groups')[subcategory]
    data[:name] if data
  end

  def category_filter
    @category
  end

  def ordered_group_filters
    @data ||= Api::Config.data[:filters][:filter_groups] || {}
    @data.keys
  end

  def ordered_filters group_name
    @data ||= Api::Config.data[:filters][:filter_groups] || []
    @data[group_name] || []
  end
end
