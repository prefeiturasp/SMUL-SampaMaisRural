module Api::Utils
  def extract_range range, value
    value = value.to_f
    return if value.zero?
    range.select { |range| value >= range[0].to_i && value <= range[1] }[0]
  end
end
