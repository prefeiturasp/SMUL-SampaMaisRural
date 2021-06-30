class ZoneFinder
  def process row
    row[:zone] = find_zone(row[:_lon], row[:_lat])
    row
  end

  private

  def find_zone lon, lat
    return if lon.nil? || lat.nil?
    point = "POINT (#{lon} #{lat})"
    Region.find_by_sql("select name from regions where kind in (#{ Region.kinds[:rural_urban]}, #{ Region.kinds[:region] }) AND ST_COVERS(regions.geom, ST_GeogFromText('#{point}')) order by kind desc").map(&:name).join(' ')
  end
end
