require './lib/etl/market_api_client.rb'
require './lib/etl/spellable.rb'
require 'action_view/base'

class MarketTransform
  include Spellable

  attr_reader :origin, :markets

  def initialize origin
    @markets = (origin == "idec" ? MarketApiClient.new.get_markets : [])
    @origin = origin
  end

  def process(row)
    new_row = Hash.new
    row.each do |attr, value|
      next if attr == :wpcfhorario
      row.merge!(attr => fix_empty_values(value))
    end
    new_row[:name] = row[:post_title] || row[:nm_equipamento]
    new_row[:public] = true
    new_row[:kind] = row[:tipo]
    new_row[:subcategory_list] = row[:tipo]
    new_row[:type] = Market
    new_row[:category_name] = "Mercados"
    new_row[:schedule] = row[:wpcfhorario] || row[:tx_dia_funcionamento]
    new_row[:workers] = row[:qt_feirantes]
    new_row[:web_pages] = row[:wpcfreferencia]
    new_row[:references] = row[:wpcfobservacoessobreohorario] || row[:referencia]
    new_row[:api_id] = row[:registro] || row[:cd_registro] || row[:id]

    new_row[:city] = row[:cidade] || 'São Paulo'
    new_row[:full_address] = row[:wpcfaddress] || row[:tx_endereco_equipamento]
    new_row[:district] = row[:nm_distrito]
    new_row[:neighborhood] = row[:nm_bairro_equipamento]
    latlon = []
    latlon = parse_wpcflatlng(row[:wpcflatlng]) if row[:wpcflatlng]
    new_row[:_lat] = latlon[0]
    new_row[:_lon] = latlon[1]

    if row[:ge_ponto]
      text, lat, lon = row[:ge_ponto].gsub('(', '').gsub(')', '' ).split(' ')
      converted_coords = convert_utm(lat, lon)
      new_row[:_lat] = converted_coords[:lat]
      new_row[:_lon] = converted_coords[:lon]
    end

    new_row[:state] = row[:uf] || 'SP'
    if row[:produto]
      new_row[:product_list] = row[:produto].to_s.gsub(',', ';')
    end
    new_row[:zone] = normalize_zone(find_zone(new_row[:_lon], new_row[:_lat]))

    new_row[:attachments_attributes] = Hash.new
    new_row[:source] = origin
    new_row[:status] = new_row[:zone].present? ? Partner.statuses[:approved] : Partner.statuses[:pending]

    if Partner.sources[origin] == Partner.sources[:idec]
      market = markets.select {|n| n["title"]["rendered"] == new_row[:name]}.first
      if market
        new_row[:remote_avatar_url] = market['avatar']
        new_row[:external_link] = market['link']
        existing_market = Market.idec.find_by api_id: new_row[:api_id]
        existing_market.attachments.api.destroy_all if existing_market
        images = MarketApiClient.new.get_images(market['id'])
        images.each_with_index do |image, i|
          file = image['media_details']['file']
          remote_url = Rails.application.secrets.idec_uploads_url + file.to_s
          next if file.nil? || remote_url == market['avatar']
          new_row[:attachments_attributes][i] = {
            remote_file_url: remote_url,
            origin: Attachment.origins[:api]
          }
        end
      end
    else
      new_row[:subcategory_list] = "Feiras Livres Municipais"
      new_row[:source_date] = Date.today.year - 1
      new_row[:qualification_list] = translate_list(row[:categoria])
      new_row[:name] = "Feira #{new_row[:name]}"
    end
    new_row[:subcategory_list] = translate_list(new_row[:subcategory_list])

    new_row
  end

  private

  def normalize_zone zone_name
    if zone_name.present? and zone_name.downcase.exclude?('zona')
      "Zona #{ zone_name }"
    else
      zone_name
    end
  end

  def find_zone lon, lat
    return if lon.nil? || lat.nil?
    point = "POINT (#{lon} #{lat})"
    Region.find_by_sql("select name from regions where kind in (#{ Region.kinds[:rural_urban]}, #{ Region.kinds[:region] }) AND ST_COVERS(regions.geom, ST_GeogFromText('#{point}')) order by kind desc").map(&:name).join(' ')
  end

  def fix_empty_values value
    value = nil if value == 'Nao sabe'
    if value.is_a? String
      ActionView::Base.full_sanitizer.sanitize(value)
    else
      value
    end
  end

  def parse_wpcflatlng data
    data.to_s.split(',').map {|i| i.gsub(')', '').gsub('(', '')}
  end

  def convert_utm lat, lon
    coords = Coordinates.utm_to_lat_long("WGS-84", lon.to_f, lat.to_f, "23S")
    lon = coords[:long]
    lat = coords[:lat]
    { lat: lat, lon: lon }
  end
end
