class AreaSerializer
  class << self
    def serialize area
      level = case parsed area
              when -Float::INFINITY..0 then nil
              when 0..0.09 then :lower
              when 0.1..5 then :medium
              else
                :greater
              end
      serialized level
    end

    private

    def serialized level
      I18n.t('areas')[level]
    end

    def parsed area
      area.to_s.gsub(',', '.').to_f
    end
  end
end
