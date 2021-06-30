class SearchBuilder
  attr_accessor :query

  def initialize input_query = Hash.new
    @input = input_query
    self.query = transform(input_query[:filters]) || {}
  end

  def search term
    Partner.search!(term, where: query.merge(default_query))
  end

  def filters term
    categories = []
    partners = search('*').group_by(&:type)
    %w[upa tourism market initiative].each do |category|
      categories[categories_names.index(category.to_sym)] = FilterService.new(category,
                                                                              partners[category],
                                                                              query_for(category),
                                                                              covid?).category_filter
    end
    categories.compact
  end

  def query_params
    query.merge(default_query)
  end

  def query_for category
    data = @input.dig(:filters, category.to_sym, :subcategory_list) || []
    return data
  end

  def filtered term
    @filtered ||= search(term, self.query)
  end

  def covid?
    @input[:covid].present?
  end

  private

  def default_query
    default = {}
    default[:covid] = @input[:covid] if @input[:covid]
    default[:has_related_partners] = @input[:has_related_partners] if @input[:has_related_partners]
    default.merge(Partner.default_search_query)
  end

  def categories_names # TODO use names from partners class
    I18n.t('filters').keys;
  end

  def should_match? category
    @input[:filters] && @input[:filters].keys.include?(category)
  end

  def transform filters
    return unless filters.present?
    FilterQuery.new(HashWithIndifferentAccess.new(filters.dup)).query
  end
end
