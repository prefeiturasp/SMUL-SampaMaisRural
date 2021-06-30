class Region < ApplicationRecord
 # searchkick
  enum kind: [:city, :region, :park, :native, :conservation, :rural_urban]

  def search_data
    {
      name: name,
      geom: formatted_coords.to_json
    }
  end

  def to_geojson
    RGeo::GeoJSON.encode(geom).merge!(properties: { name: name,
                                                    kind: kind })
  end

  private

  def formatted_coords
    all_coords = []
    geom.to_s.split(',').each do |point|
      coords = point.split(' ').map {|x| x.gsub('(', '')}.map(&:to_f).select {|x| !x.zero? }
      all_coords << { lat: coords[1], lon: coords[0] }
    end
    all_coords
  end
end
