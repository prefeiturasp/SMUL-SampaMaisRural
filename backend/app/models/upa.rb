class Upa < Partner
  acts_as_taggable_on tag_list
  PARTICIPATORY_SYSTEM = ["Orgânico Participativo"]
  AUDIT = ["Orgânico por Auditoria"]
  OCS = ["Orgânico OCS - Organização de Controle Social"]
  ORGANIC = ["Orgânico certificado"]
  ORGANIC_TRANSITION = ["Protocolo de Transição Agroecológica"]
  ORGANIC_CERTIFICATES = [PARTICIPATORY_SYSTEM, AUDIT, OCS, ORGANIC_TRANSITION].flatten

  scope :farmers, -> { joins(:subcategories).where(subcategories: { name: [I18n.t('subcategories')[:farmers_with_contact], I18n.t('subcategories')[:farmers_without_contact]] }).group(:id) }
  scope :agriculture, -> { joins(:subcategories).where.not(subcategories: { name: [I18n.t('subcategories')[:farmers_with_contact], I18n.t('subcategories')[:farmers_without_contact]] }).group(:id) }

  class << self
    def registration_attributes
      super + %i[registration_name
      who_sells_details
      birthdate
      area
      ]
    end

    def publishable_attributes
      super + %i[cultivated_area_range]
    end

    def searchable_attributes
      super + %i[family_work other_production produces_fruits produces_ornamentals produces_vegetables region]
    end

    # TODO refactor
    def born_before upas, year
      upas.select { |upa| upa.birthdate_year && upa.birthdate_year <= year}
    end

    def born_between upas, start_year, end_year
      upas.select { |upa| upa.birthdate_year && upa.birthdate_year >= start_year && upa.birthdate_year <= end_year }
    end

    # TODO extract to a class
    def with_area upas, level
      upas.select { |upa| upa.cultivated_area_range == I18n.t('areas')[level] }
    end

    def admin_permitted_params
      super + %i[dap]
    end

    def public_report
      report = super
      report.add(:natives, :subcategory_list, "Aldeias Guarani")

      # TODO refactor
      upas = report.partners.select { |u| u.is_farmer }

      organic = upas.select { |u| (u.all_qualifications & ORGANIC_CERTIFICATES).any? }.count
      participatory_system = upas.select { |u| (u.all_qualifications & PARTICIPATORY_SYSTEM).any?  }.count
      audit = upas.select {|u| (u.all_qualifications & AUDIT).any? }.count
      organization = upas.select { |u| (u.all_qualifications & OCS).any? }.count
      in_organic_transition = upas.select { |u| (u.all_qualifications & ORGANIC_TRANSITION).any? }.count
      organic_transition_percentage = (in_organic_transition.to_f / upas.count) * 100

      roots = upas.select { |u| u.produces_vegetables }.count
      roots_percentage = (roots.to_f / upas.count * 100).round(2)

      ornamental = upas.select {|u| u.produces_ornamentals }.count
      ornamental_percentage = (ornamental.to_f / upas.count * 100).round(2)

      fruits = upas.select {|u| u.produces_fruits }.count
      fruits_percentage = (fruits.to_f / upas.count * 100).round(2)

      others = upas.select { |u| u.other_production }.count
      others_percentage = (others.to_f / upas.count * 100).round(2)

      upas_with_birthdate = upas.select { |u| u.birthdate_year.present? }

      upas_with_area = upas.select {|u| u.cultivated_area_range.present? }

      report.add_value(:farmers, upas.count)
      report.add(:urban_gardens, :subcategory_list, "Hortas Urbanas")
      report.add(:gardens_with_equipments, :subcategory_list, "Hortas em equipamentos públicos")
      report.add(:farmers_with_contact, :subcategory_list, "Agricultores com contato")
      report.add_value(:south, upas.select {|u| u.region.include?('Sul') }.count)
      report.add_value(:east, upas.select {|u| u.region.include?('Leste') }.count)
      report.add_value(:north, upas.select {|u| u.region.include?('Norte') }.count)
      report.add_value(:headed_by_women, (upas.select { |u| u.gender == "Feminino" }.count.to_f / upas.count * 100))
      report.add_value(:age_first_level, ((Upa.born_between(upas, 34.years.ago.year, 18.year.ago.year).count.to_f / upas_with_birthdate.count) * 100).round(2))
      report.add_value(:age_middle_level, ((Upa.born_between(upas, 59.years.ago.year, 35.years.ago.year).count.to_f / upas_with_birthdate.count) * 100).round(2))
      report.add_value(:age_last_level, ((Upa.born_before(upas, 60.years.ago.year).count.to_f / upas_with_birthdate.count) * 100).round(2))
      report.add_value(:family_work, (upas.select {|w| w.family_work }.count.to_f / upas.count * 100).round(2))
      report.add_value(:roots, roots)
      report.add_value(:roots_percentage, roots_percentage)
      report.add_value(:ornamental, ornamental)
      report.add_value(:ornamental_percentage, ornamental_percentage)
      report.add_value(:fruits, fruits)
      report.add_value(:fruits_percentage, fruits_percentage)
      report.add_value(:others, others)
      report.add_value(:others_percentage, others_percentage)
      report.add_value(:organic, organic)
      report.add_value(:organic_percentage, ((organic.to_f / upas.count) * 100))
      report.add_value(:participatory_system, participatory_system)
      report.add_value(:audit, audit)
      report.add_value(:organization, organization)
      report.add_value(:in_organic_transition, in_organic_transition)
      report.add_value(:in_organic_transition_percentage, organic_transition_percentage)
      report.add_value(:area_larger_then, ((Upa.with_area(upas_with_area, :greater)).count.to_f / upas_with_area.count * 100).round(2))
      report.add_value(:area_between, (Upa.with_area(upas_with_area, :medium).count.to_f / upas_with_area.count * 100).round(2))
      report.add_value(:area_less_than, (Upa.with_area(upas_with_area, :lower).count.to_f / upas_with_area.count * 100).round(2))
      report
    end
  end

  store_accessor :data, serialized_attributes

  registration_attributes.each do |reg_attr|
    ransacker reg_attr do |parent|
      Arel::Nodes::InfixOperation.new('->>', parent.table[:data], Arel::Nodes.build_quoted(reg_attr.to_s))
    end
  end

  def age
    return unless birthdate
    b = birthdate.is_a?(String) ? Date.parse(birthdate) : birthdate
    Time.zone.now.year - b.year
  end

  def birthdate= date
    return super(nil) if date.blank?
    formatted_date = nil
    begin
      if api? and !persisted?
        # receives format DDMMMM
        # TODO fix dae sent by api
        month = date.chars.each_with_index.select {|x, y| y < 2 }.map {|a| a[0]}.join('')
        year = date.chars.each_with_index.select {|x, y| y > 1 }.map {|a| a[0]}.join('')
        formatted_date = Date.parse([year, month, '01'].join('-'))
      else
        formatted_date = (Date.parse(date))
      end
    rescue => e
      Rails.logger.info("failed to parse date #{e.message}")
    end
    super formatted_date
  end

  def subcategory_list= values
    super(translate_list(values))
  end
end
