class TransformDefaultValues < Struct.new(:field, :values, keyword_init: true)
  def process row
    data = row[field]
    if data.kind_of?(Array)
      data.each_with_index do |value, index|
        row[field][index] = transform value
      end
    else
      row[field] = transform data
    end
    row
  end

  private
  def transform value
    values[value.to_s] || value
  end
end
