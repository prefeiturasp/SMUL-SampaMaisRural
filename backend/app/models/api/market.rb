module Api
  class Market < Partner

    def name
      geosampa? ? super.titleize : super
    end

    def self.filters
      super + %i[zone qualification_list]
    end

    def publishable_attributes
      super << :workers
    end

    def address
      geosampa? ? super.to_s.titleize : super
    end

    def search_data
      super.merge(workers: workers, tag_list: tag_list)
    end
  end
end
