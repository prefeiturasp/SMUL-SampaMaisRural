class TransformList < Struct.new(:field)
  def process row
    value = row.delete(field)
    row[field] = value.to_s.split(/;|,/).map { |value| value.strip }
    row
  end
end
