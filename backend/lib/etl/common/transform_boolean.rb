class TransformBoolean < Struct.new(:fields, keyword_init: true)
  def process row
    fields.each do |field|
      row[field] = to_boolean row[field]
    end
    row
  end

  private
  def to_boolean input
    input.to_s.downcase == "sim" or input.to_s.downcase == '1'
  end
end
