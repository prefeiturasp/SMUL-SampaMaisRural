module Download
  class Partner < SimpleDelegator
    def initialize partner
      __setobj__(partner)
    end

    def farmer?
      farmer_with_contact? or farmer_without_contact?
    end

    def farmer_with_contact?
      has_subcategory? I18n.t('subcategories.farmers_with_contact')
    end

    def farmer_without_contact?
      has_subcategory? I18n.t('subcategories.farmers_without_contact')
    end

    def rural_experience?
      has_subcategory? I18n.t('subcategories.rural_experience')
    end

    def schedule
      super.to_s.gsub(/<[^>]*>/, ' - ') unless farmer?
    end

    def area_range
      AreaSerializer.serialize(area) if farmer? and area
    end

    def neighborhood
      farmer? ? registration_neighborhood : super
    end

    def lat
      super unless farmer? or rural_experience?
    end

    def lon
      super unless farmer? or rural_experience?
    end

    def gender
      super if public?
    end

    def source
      return I18n.t('source_bases.sources.farmer_with_contact') if farmer_with_contact?
      return I18n.t('source_bases.sources.farmer_without_contact') if farmer_without_contact?
      I18n.t('source_bases.sources')[super.to_sym]
    end

    def zip_code
      super unless farmer?
    end

    private

    def has_subcategory? sub_name
      subcategory_list.include? sub_name
    end
  end
end
