class TranslateType
  def process row
    origin = row.delete(:origin)
    row.merge(type: Dictionary.translate((row[:category_name] or origin)))
  end
end
