class ZoneParser
  def process row
    row[:zone] = normalize_zone(row.delete(:zone))
    row
  end

  private

  def normalize_zone zone_name
    if zone_name.present? and zone_name.downcase.exclude?('zona')
      "Zona #{ zone_name }"
    else
      zone_name
    end
  end
end
