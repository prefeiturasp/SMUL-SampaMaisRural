class Market < Partner
  attr_accessor :wpcflatlng
  acts_as_taggable_on tag_list
  scope :integrated, -> { where(source: [sources[:idec], sources[:geosampa]]) }

  class << self
    def serialized_attributes
      %i[workers] + super
    end

    def with_kind kind
      where(kind: kind)
    end

    def public_report
      report = super
      report.add(:free, :subcategory_list, "Feiras Livres Municipais")
      report.add(:with_organic_partner, :subcategory_list, "Comércio Parceiro de Orgânicos")
      report.add(:organic, :subcategory_list, "Feiras Orgânicas")
      report.add(:with_agriculture_support, :subcategory_list, "Grupo de Consumo Responsável")
      report.add(:with_organic_ingredients, :subcategory_list, "Restaurantes com Orgânicos")
      report.add(:food_delivery, :subcategory_list, "Entrega de Orgânicos")
      report.add(:with_local_partners, :subcategory_list, "Parceiro da produção de Sampa")
      report
    end
  end

  store_accessor :data, serialized_attributes

  private

  def set_default_values
    return unless geosampa? || idec?
    default_values = self.class.default_values
    self.source_info = default_values[source.to_sym][:source_info] unless source_info
    self.source_link = default_values[source.to_sym][:source_link] unless source_link
    return unless geosampa?
    self.source_link = default_values[source.to_sym][:source_link] unless source_link
  end
end
