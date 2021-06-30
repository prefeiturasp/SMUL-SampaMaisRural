# TODO import market from partner tranform
require 'action_view/base'

class PartnerTransform
  attr_accessor :origin
  include Spellable

  def initialize origin
    @origin = origin
  end

  def process row
    row.each do |attr, value|
      row.merge!(attr => fix_empty_values(value))
    end
    row[:phones_attributes] = []
    %i[commercial registration].each do |phone_scope|
      0.upto(2).each do |index|
        numbers = row.delete("#{ phone_scope }_phone_#{ index }".to_sym)
        kind = row.delete("#{ phone_scope }_phone_kind_#{ index }".to_sym)
        numbers.to_s.split(';').each do |number|
          row[:phones_attributes] << new_phone(number, kind, phone_scope) if number
        end
      end
    end
    row[:zone] = normalize_zone(row[:zone] || find_zone(row[:_lon], row[:_lat]))
    row[:status] = row[:zone].present? ? define_status(row) : Partner.statuses[:pending]
    row.merge(type: translate((row[:category_name] or origin)),
              subcategory_list: translate_list(row[:subcategory_list]),
              certificate_list: translate_list(row[:certificate_list]),
              public: translate_boolean(row[:is_public]),
              dap: translate_boolean(row[:dap]),
              has_internet_access: translate_boolean(row[:has_internet_access]),
              family_work: translate_boolean(row[:family_work]),
              disabled_friendly_amenities: translate_boolean(row[:disabled_friendly_amenities]))
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

  def new_phone number, kind, scope
    { phone_number: number.to_s, kind: kind, scope: scope }
  end

  def define_status row
    return Partner.statuses[:pending] unless row[:_lat] && row[:_lon]
    if row[:source] == 'sprural'
      row[:is_public].to_s.downcase == 'sim' ? Partner.statuses[:approved] : Partner.statuses[:pending]
    else
      Partner.statuses[:approved]
    end
  end

  def fix_empty_values value
    value = nil if value == 'Nao sabe'
    if value.is_a? String
      ActionView::Base.full_sanitizer.sanitize(value).gsub('&amp;', '&')
    else
      value
    end
  end

  def translate_boolean input
    input.to_s.downcase == "sim"
  end
end
