module Api
  class Partner < SimpleDelegator

    def initialize partner
      __setobj__(partner)
    end

    def self.filters
      %i[subcategory_list]
    end

    def public?
      true
    end

    def publishable_attributes
      %i[id
      family_work
      public
      name
      email
      source
      slug
      avatar_url
      disabled_friendly_amenities
      associativism
      commercial_phones
      attachments_list
      references
      park
      zone
      type
      description
      cultivated_area
      source_info
      source_link
      web_pages
      qualification_list
      subcategory_list
      farms_count]
    end

    # TODO  remove duplication  on partner
    def self.partner_klasses_names
      %w[market upa tourism initiative]
    end

    def commercial_phones
      phones.commercial.map { |phone| { phone_number: phone.phone_number, kind: phone.kind } }
    end

    def web_pages
      [super.to_s.split(','), contact.to_s.split(',')].select { |page| page.present? }.flatten.map { |page| WebPageFormatter.call(page.strip) }.compact
    end

    def self.related_ids_method_for klass
      "#{ klass.downcase }_ids"
    end

    COVID_SUBCATEGORIES_LIST = ["Redes articuladas para receber doações", "Entrega de Orgânicos", "SP Cidade Solidária", "Agricultores com contato", "Parceiro da produção de Sampa"]

    def address
      data = address_attributes.map { |attribute| self.send(attribute) }
      data = registration_address_attributes.map { |attribute| self.send(attribute) } if data.empty?
      data.select {|attribute| attribute.present? }.join(', ')
    end

    def resume_address
      return address if publish_address? and publish_full_address_on_list?
      data = resume_address_attributes.map { |attribute| self.send(attribute) }
      data = registration_address_attributes.map { |attribute| self.send(attribute) } if data.empty?
      data.select {|attribute| attribute.present? }.join(', ')
    end

    def source_info
      data = super
      return unless data
      data += ", #{source_date}." if source_date.present?
      if source_info2.present? and source_update.present?
        data += " Última Atualização #{source_info2}"
        data += " em #{source_update}" if source_update
      end
      data
    end

    def full_address?
      (subcategory_list & ['Agricultores com contato', 'Agricultores sem contato', 'Aldeias Guarani']).empty?
    end

    def accessible?
      publish_address? and public? and full_address.present? and (subcategory_list & ['Aldeias Guarani']).empty?
    end

     def address_attributes
       (!publish_only_resume_address? and publish_address?) ? %i[full_address] + resume_address_attributes : resume_address_attributes
     end

    def registration_address_attributes
      %i[registration_neighborhood zone]
    end

    def resume_address_attributes
      %i[neighborhood district zone]
    end

    def search_data
      publishable_params
        .merge!(tag_param_list)
        .merge(status: status)
        .merge(category_name: category_name)
        .merge(begined_at: begined_at.to_s)
        .merge(product_list: product_list)
        .merge(visible_product_list: visible_product_list)
        .merge(city: city)
        .merge(full_address: full_address)
        .merge(district: district)
        .merge(zip_code: zip_code)
        .merge(neighborhood: neighborhood)
        .merge(registration_neighborhood: registration_neighborhood)
        .merge(public: public?)
        .merge(has_avatar: has_avatar?)
        .merge(schedule: schedule)
        .merge(resume_schedule: resume_schedule)
        .merge(address: address)
        .merge(accessible: accessible?)
        .merge(resume_address: resume_address)
        .merge(gender: gender)
        .merge!(icon: icon)
        .merge!(public: public?)
        .merge(suggestable: suggestable?)
        .merge(related_partner_ids: related_partner_ids)
        .merge(connected_subcategories: connected_subcategories)
        .merge(connections_resume: connections_resume)
        .merge(related_partner_slugs: related_partner_slugs)
        .merge(related_partners_by_category)
        .merge(has_related_partners: related_partner_ids.any?)
        .merge(covid: covid?)
        .merge!(lat: lat)
        .merge!(lon: lon)
        .merge(phone_0: phone_0)
        .merge(phone_kind_0: phone_kind_0)
        .merge(certificate_list: certificate_list)
        .merge(phone_1: phone_1)
        .merge(phone_kind_1: phone_kind_1)
        .merge(location: { lat: lat, lon: lon },
               region: region,
               type: type.downcase,
               category: I18n.t('activerecord.models')[self.class.name])
    end

    def resume_schedule
      schedule
    end

    def suggestable?
      !geosampa? and public?
    end

    def commentable?
      !idec? and public?
    end

    def publishable_params
      publishable_attributes.map { |attribute| { attribute => self.send(attribute) } }
        .reduce({}, :merge)
    end

    def covid?
      (COVID_SUBCATEGORIES_LIST & subcategory_list).any?
    end

    def related_partner_ids
      partners.approved.pluck(:id)
    end

    def connections_resume
      connections.map {|connection| [connection.partners.pluck(:name) - [name], connection.description].select {|item| item.present? }.join(' - ') }
    end

    def related_partner_slugs
      partners.approved.pluck(:slug)
    end

    Partner.partner_klasses_names.each do |kind|
      method_name = "#{ kind }_ids"
      define_method(kind.pluralize) do
        related_partners.where(type: kind.camelcase).approved
      end

      define_method(method_name) do
        self.send(kind.pluralize).pluck(:id)
      end

      define_method("#{ method_name }=") do |new_partners_ids|
        self.remove_related_partners(self.send(method_name))
        self.related_partner_ids += new_partners_ids
      end
    end

    def related_partners
      partners.where.not(id: id)
    end

    def connected_subcategories
      Set.new(related_partners.map(&:subcategory_list).flatten + subcategory_list)
    end

    def related_partners_by_category
      Category.all_types.map {|c_name|
        { "#{c_name}_ids" => related_partners.where(type: c_name.camelcase).pluck(:id) }
      }.reduce({}, :merge)
    end

    def attachments_list
      files = attachments.url
      (files.empty? or !public?) ? subcategories.map { |subcategory| subcategory.attachments.url }.flatten.uniq : files
    end

    def has_avatar?
      avatar.url.present? and public?
    end

    def avatar_url
      avatar.site.url || "#{ Rails.configuration.action_controller.asset_host }/icons/#{ type.downcase }-default-avatar.svg"  # TODO migrate for api model
    end

    def icon
      "#{ Rails.configuration.action_controller.asset_host }/icons/#{ type.downcase }-pin.svg"  # TODO migrate for api model
    end

    def type
      super.downcase
    end

    def source_date
      begin
        Date.parse(super).strftime('%d/%m/%Y')
      rescue
        super
      end
    end

    # filter connections that are with approveed partners
    # excluding, self
    # because self can be approved, but it's not a connectect partner
    def connections
      super.includes(:partners)
        .where(partners: { status: :approved })
        .where.not(partners: { id: id })
        .group("connections.id, partners.id")
    end

    def visible_product_list
      product_list
    end

    def filterable_values_for field
      filterable_values = "visible_#{field}"
      respond_to?(filterable_values) ? send(filterable_values) : send(field)
    end

    def phone_0
      phones.first&.phone_number
    end

    def phone_kind_0
      phones.first&.kind
    end

    def phone_1
      phones.second&.phone_number
    end

    def phone_kind_1
      phones.second&.kind
    end
  end
end
