class FilterQuery
  attr_accessor :queries

  def initialize input
    @queries = []
    input.each do |category, query|
      if query[:subcategory_list].blank?
        query.merge!(subcategory_list: I18n.t("categories.#{category}").values)
      end
      queries << HashWithIndifferentAccess.new(query.merge!(type: category))
    end
  end

  def query
    data = {_or: []}
    _queries = []
    queries.each do |query_data|
      _queries = []
      fields = []
      query_data[:subcategory_list].to_a.each do |subcategory_name|
        _queries << Query.new(group_name: subcategory_name)
      end

      query_data.each do |field, values|
        next if field.to_sym == :subcategory_list
        _field = QueryField.new(field, values)
        _queries.map { |sq| sq.add_field(_field) }
        fields << _field
      end

      if _queries.any?
        data[:_or] += _queries.map { |q| q.to_query.reduce({}, :merge) }.flatten
      else
        data[:_or] << Query.new(fields: fields).to_query.reduce({}, :merge)
      end
    end
    data
  end
end
