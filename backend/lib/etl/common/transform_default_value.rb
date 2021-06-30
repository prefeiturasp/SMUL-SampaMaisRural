class TransformDefaultValue < Struct.new(:field, :values, keyword_init: true)
  def process row
    value = row.delete(field)
    row[field] = values[value.to_s] || value
    row
  end
end
