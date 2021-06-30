module Api
  class Tourism < Partner
    def self.filters
      super + %i[neighborhood_region_list qualification_list]
    end

    def product_list
      list = super
      %i[experience_list food_list nature_list culture_list service_list accommodation_list].each do |tag_list|
        list += self.send(tag_list)
      end
      list
    end

    def search_data
      super.merge(tag_by_subcategories)
    end

    def tag_by_subcategories
      case
      when subcategory_list.include?("Vivência Rural")
        { experience_list: product_list }
      when subcategory_list.include?("Cultura")
        { culture_list: product_list }
      when subcategory_list.include?("Natureza")
        { nature_list: product_list }
      when subcategory_list.include?("Hospedagem")
        { accommodation_list: product_list }
      when subcategory_list.include?("Comércio e Serviços")
        { service_list: product_list }
      when subcategory_list.include?("Alimentação")
        { food_list: product_list }
      else
        {}
      end
    end
  end
end
