class AddDefaultValues
  def initialize(default_values = {})
    @default_values = default_values
  end

  def process row
    @default_values.each do |key, value|
      row.merge!(key => value)
    end
    row[:source_date] = Date.today.strftime('%Y')
    row
  end
end
