class Api::Filters::Ordered < Struct.new(:category, :field, :values_to_order)

  def values
    data = []
    ordered = ordered_values
    data = if ordered
      values_to_order.sort_by { |value| ordered.index(value) || values_to_order.size }
    else
      values_to_order.compact.sort
    end
    data.select { |x| x.present? }
  end

  private
  def ordered_values
    @data ||= Api::Config.data[:filters][category.to_sym] || {}
    @data[field.to_sym]
  end
end
