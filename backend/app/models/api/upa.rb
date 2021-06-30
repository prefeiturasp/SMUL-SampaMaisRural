module Api
  class Upa < Partner
    AGE_RANGES = [[0, 29], [30, 59]]

    include ProductListMethods

    def self.filters
      super + %i[zone]
    end

    def publishable_attributes
      super + %i[certificate_list cultivated_area_range]
    end

    # TODO include injectable module
    include Api::Utils

    def schedule
      super if garden? || guarani?
    end

    def certificate_list
      return super if public?
      []
    end

    def email
      super if public?
    end

    def resume_schedule
    end

    def title
      return name if public?  
      female? ? "Agricultora anônima" : "Agricultor anônimo"
    end

    def female?
      gender == 'Feminino'
    end

    def phone_0
      super if public?
    end

    def phone_kind_0
      super if public?
    end

    def phone_1
      super if public?
    end

    def phone_kind_1
      super if public?
    end

    def name
      return super if public?
      female? ?  "Produtora Agrícola" : "Produtor Agrícola"
    end

    def associativism
      return super if public?
      (super.present? and super.downcase != "não") ? "Sim" : "Não"
    end

    def birthdate
      b = super
      Date.parse(b) if b.is_a?(String)
    end

    def area
      super.to_s
    end

    def search_data
      super.merge({age: (extract_range(AGE_RANGES, age).try(:join, ' - ') || 'Maior que 60'),
                   birthdate_year: birthdate&.year,
                   product_list: product_list,
                   attachments_list: attachments_list,
                   area: area,
                   cultivated_area: cultivated_area,
                   is_farmer: farmer?,
                   qualification_list: public_qualification_list,
                   all_qualifications: all_qualifications,
                   other_production: has_other_production?,
                   produces_fruits: produces_fruits?,
                   dap: dap,
                   produces_ornamentals: produces_ornamentals?,
                   produces_vegetables: produces_vegetables?

      })
    end

    def public_qualification_list
      return qualification_list + certificate_list if public?
      []
    end

    def all_qualifications
      qualification_list + certificates.pluck(:name)
    end

    def cultivated_area_range
      AreaSerializer.serialize(cultivated_area) if farmer? and cultivated_area
    end

    def publishable_params
      super
    end

    def public?
      subcategory_list.exclude? "Agricultores sem contato"
    end

    def avatar_url
      return super if public?
      "#{ Rails.configuration.action_controller.asset_host }/icons/#{ type.downcase }-without-contact.svg"  # TODO migrate for api model
    end

    def commercial_phones
      return [] unless public?
      super
    end

    def web_pages
      return [] unless public?
      super
    end

    def description
      return super if public?
    end

    def farmer?
      (subcategory_list & ['Agricultores com contato', 'Agricultores sem contato']).any?
    end

    def garden?
      (subcategory_list & ['Hortas urbanas', 'Hortas em equipamentos públicos']).any?
    end

    def product_list
      super.map { |product| I18n.t('product_list')[product.to_i] || product }.compact.uniq
    end

    def visible_product_list
      public? ? product_list : product_list_on_profile(product_list)
    end

    def guarani?
      (subcategory_list & ['Aldeias Guarani'])
    end

    def icon
      return super if public?
      "#{ Rails.configuration.action_controller.asset_host }/icons/#{ type.downcase }-without-contact-pin.svg"  # TODO migrate for api model
    end

    def has_other_production?
      production = product_list_on_painel(product_list)
      # if production has Outras, should be counted once
      (production & ["Outras"]).any? && production.count == 1
    end

    def produces_ornamentals?
      ornamental_tag_name = I18n.t('product_list_names.ornamental')
      ornamental_code = I18n.t('product_list').invert[ornamental_tag_name].to_s
      (product_list_on_painel(product_list) & [ornamental_tag_name, ornamental_code]).any?
    end

    def produces_fruits?
      product_list_on_painel(product_list).include?("Frutas")
    end

    def produces_vegetables?
      product_list_on_painel(product_list).include?('Legumes, Verduras e Raízes')
    end
  end
end
