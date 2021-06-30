module Api::Filters
  class Filter < SimpleDelegator
    attr_reader :field, :filter

    def initialize(category:, filter:, covid:)
      __setobj__(filter)
      @category = category
      @filter = filter
      @options = covid ? covid_list : tag_list
      @label = filter.label
    end

    def label
      @label || "#{ I18n.t("filters.#{@category}.#{ @field }") }"
    end

    def field
      ordering.start_with?("_") ? super : ordering
    end

    def values
      data = []
      ordered = ordered_values
      data = if ordered
               @options.sort_by { |value| ordered.index(value) || @options.size }
             else
               @options.compact.sort
             end
      data.select { |x| x.present? }
    end

    def tag_list
      super - [I18n.t('product_list_names.no_information')]
    end

    def covid_list
      subcategories = Api::Partner::COVID_SUBCATEGORIES_LIST.map(&:downcase)
      super.select { |tag| subcategories.include?(tag.downcase) }
    end

    private

    def ordered_values
      @data ||= Api::Config.data[:filters][@category.to_sym] || {}
      @data[field.to_sym]
    end
  end
end
