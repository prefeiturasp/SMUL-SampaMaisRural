class Api::Filters::Group < Struct.new(:name, :partners, :filters_to_match)
  def filters
    list = Array.new
    tag_list = if should_match?
                              filters_to_match.keys - [:type]
                            else
                              "Api::#{ name.camelcase }".constantize.filters
                            end
    tag_list.each do |tag|
      f = Api::Filters::Filter.new(name, tag, valid_values(tag))
      list << f unless f.values.blank?
    end
    list
  end

  def count
    return partners.count unless filters_to_match && filters_to_match[:type]
    partners.select { |p| p.type == filters_to_match[:type] }.count
  end

  def label
    name.camelcase.constantize.model_name.human
  end

  def valid_values tag
    values = self.partners.map(&tag).flatten.compact.sort.uniq
    match_values = filters_to_match[tag]
    return values if match_values.blank?
    values.select {|value| match_values.include?(value) }
  end

  private

  def should_match?
    filters_to_match && (filters_to_match.keys - [:type]).any?
  end
end
