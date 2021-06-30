class Initiative < Partner
  acts_as_taggable_on tag_list
  class << self
    def public_report
      report = super
      report.add(:public_policies, :subcategory_list, "Políticas Públicas")
      report.add(:associations, :subcategory_list, "Associações e Cooperativas")
      report.add(:civil_society, :subcategory_list, "Iniciativas da Sociedade Civil")
      report.add(:research, :subcategory_list, "Pesquisa e Extensão")
      report
    end
  end

  store_accessor :data, serialized_attributes
end
