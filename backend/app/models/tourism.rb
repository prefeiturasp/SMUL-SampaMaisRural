class Tourism < Partner
  acts_as_taggable_on tag_list

  scope :rural_experience, -> { joins(:subcategories).where(subcategories: {name: I18n.t('subcategories.rural_experience')}).group(:id) }
  scope :not_rural_experience, -> { joins(:subcategories).where.not(subcategories: {name: I18n.t('subcategories.rural_experience')}).group(:id) }

  class << self

    def public_report
      report = super
      report.add(:rural_experience, :subcategory_list, I18n.t('subcategories.rural_experience'))
      report.add(:nature, :subcategory_list, "Natureza")
      report.add(:culture, :subcategory_list, "Cultura")
      report.add(:food, :subcategory_list, "Alimentação")
      report.add(:accommodation, :subcategory_list, "Hospedagem")
      report.add(:services, :subcategory_list, "Comércio e Serviços")
      report
    end
  end
  store_accessor :data, serialized_attributes

  def rural_experience?
    subcategory_list.include? I18n.t('subcategories.rural_experience')
  end
end
