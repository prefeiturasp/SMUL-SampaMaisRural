module Api
  class Initiative < Partner
    def self.filters
      super + %i[zone qualification_list]
    end

    def search_data
      super.merge(tag_by_subcategories)
    end

    def tag_by_subcategories
      case
      when subcategory_list.include?("Pesquisa e Extensão")
        { research_list: product_list  }
      when subcategory_list.include?("Iniciativas da Sociedade Civil")
        { civil_society_list: product_list  }
      when subcategory_list.include?("Associações e Cooperativas")
        { association_list: product_list  }
      when subcategory_list.include?("Políticas Públicas")
        { public_policy_list: product_list  }
      else
        {}
      end
    end
  end
end
