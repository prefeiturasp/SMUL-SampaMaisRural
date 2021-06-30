class ParseEmpty
  def process row
    row.each do |attr, value|
      row.merge!(attr => fix_empty_values(value))
    end
    row
  end

  private
  def fix_empty_values value
    value = nil if value == 'Nao sabe'
    if value.is_a? String
      ActionView::Base.full_sanitizer.sanitize(value).gsub('&amp;', '&')
    else
      value
    end
  end
end
