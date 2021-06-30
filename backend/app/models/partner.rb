class Partner < ApplicationRecord
  mount_uploader :avatar, AvatarUploader
  has_paper_trail on: [:update]

  after_validation :notify

  after_commit :filters!, :schedule_reindex

  attr_accessor :status_message, :activity_list

  belongs_to :category
  has_many :attachments, as: :attachmentable, dependent: :destroy
  has_many :phones, dependent: :destroy
  has_many :suggestions, as: :suggestable, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_and_belongs_to_many :subcategories
  has_one :seal, class_name: 'PartnerSeal', as: :shareable, dependent: :destroy
  has_many :regular_seals, class_name: "RegularSeal", as: :shareable, dependent: :destroy

  has_and_belongs_to_many :certificates, join_table: :certificates_partners
  include Certifiable

  has_and_belongs_to_many :connections, join_table: :connections_partners,
    after_add: :after_add_connection,
    after_remove: :after_remove_connection
  has_many :partners, through: :connections
  has_and_belongs_to_many :related_partners,
    class_name: name,
    join_table: :related_partners,
    foreign_key: :partner_id,
    association_foreign_key: :related_partner_id,
    after_add: :after_add_related_partners,
    after_remove: :after_remove_related_partners

  serialize :data, HashSerializer

  include Taggable
  include Publishable
  include Translatable
  include Subcategories
  include Sealable

  def self.searchable_attributes
    %i[name
    category
    full_address
    neighborhood
    district
    source
    zone
    cultivated_area_range
    has_related_partners
    ] + tag_attribute_list + Filter.filterable_fields
  end

  def self.searchable_params
    searchable_attributes
      .map { |attribute| { attribute => [] } }
  end

  searchkick locations: [:location],
    word_start: searchable_attributes

  enum status: %i[pending approved refused disabled incorporated waiting_integration]

  def self.regular_statuses
    statuses.select {|status, index| %i[waiting_integration].exclude?(status.to_sym) }
  end

  def self.visible_statuses
    statuses.select {|status, index| status != "disabled" }
  end

  DEFAULT_CITY = 'São Paulo'

  before_validation :set_default_values, prepend: true, on: :create
  before_validation :normalize_data, :save_location
  validates :name, presence: true
  validates :_lat, :_lon, presence: true, if: -> { approved? && lat.nil? && lon.nil? }
  before_validation :generate_api_id!, on: :create

  scope :with_location, -> { where(city: DEFAULT_CITY) }
  scope :is_public, -> { joins(:subcategories).where(subcategories: { is_public: true }) }
  scope :ordered_by_distance, -> (center) {
    order("ST_Distance('POINT(#{ center })'::geography, lonlat)")
  }

  # searchkick
  #scope :search_import, -> { includes(:related_partners, :attachments, tags: :taggings) }

  enum source: %i[idec upa tourism geosampa sprural api]
  extend FriendlyId
  friendly_id :name, use: :slugged

  attr_accessor :is_public, :_lat, :_lon

  accepts_nested_attributes_for :attachments, :connections, allow_destroy: true
  accepts_nested_attributes_for :phones, allow_destroy: true, reject_if: proc { |attributes| attributes['phone_number'].blank? }

  class << self

    def tags_by context
      ActsAsTaggableOn::Tag.
        joins(:taggings).
        where(taggings: { context: context, taggable_id: pluck(:id) })
    end

    def partner_klasses_names
      %w[market upa tourism initiative]
    end

    def related_ids_method_for klass
      "#{ klass.downcase }_ids"
    end

    def registration_attributes
      [
       :begined_at,
       :responsable_name,
       :cpf,
       :registration_email,
       :gender,
       :contact,
       :api_name,
       :other_information,
       :cnpj,
       :company_activity,
       :other_contact,
       :registered_by,
       :user_id,
       :cnae,
      ]
    end

    def registration_address_attributes
      %i[registration_neighborhood registration_address registration_zip_code]
    end

    def address_attributes
      %i[
      full_address
      _lat
      _lon
      neighborhood
      zip_code
      district
      city
      ]
    end

    def creation_attributes
      %i[publish_address public has_internet_access authorize_information avatar schedule registration_phone_list cultivated_area activity_list certificate_list] + [certificate_list: []] + publishable_attributes + tag_attribute_list + serialized_attributes + address_attributes << Attachment.file_params.merge({ avatar_attributes: [:_destroy, :file]}).merge(Phone.phone_params)
    end

    def related_partners_attributes
      partner_klasses_names
        .map { |n| { (n + '_ids').to_sym => [] } }
    end

    def all_attributes
      creation_attributes + related_partners_attributes
    end

    def admin_permitted_params
      creation_attributes + %i[
      status
      category_id
      registration_phone_0
      registration_phone_1
      other_information
      status_message
      registration_phone
      with_local_partners
      source_info
      source_date
      source_info2
      source_update
      update_via_integration
      ] + [(%i[
      market_ids
      upa_ids
      where_find_list
      tourism_ids
      initiative_ids
      subcategory_list
      region_list
      tag_list
      neighborhood_region_list
      certificate_list
      fruit_specy_list
      qualification_list
      product_list] + tag_list.map(&:to_s).map(&:singularize).map { |x| x +  '_list'}.map(&:to_sym)).map { |attribute| { attribute => [] } }.reduce({}, :merge)]  + Taggable::TAGS.map { |tag_name| { "custom_#{tag_name}" => [:name, :id] } } + [{ connections_attributes: Connection.permitted_params }]
    end

    def all_attributes_list
      all_attributes.map { |x| x.try(:keys) || x }.flatten
    end

    def serialized_attributes
      registration_attributes + registration_address_attributes + %i[external_link]
    end

    def search! term, options = { load: false }
      options[:where] ||= {}
      options[:where].merge!(default_search_query)
      options[:load] ||= false
      options[:fields] ||= searchable_attributes
      options[:match] ||= :word_start
      Partner.search(term, options)
    end

    def default_search_query
      { status: :approved }.merge((name === "Partner") ? {} : { type: name.downcase })
    end

    def covid_report
      partners = search!('*', where: { covid: true })
      report = PartnerReportBuilder.new(partners)
      report.add(:farmers_with_contact, :subcategory_list, "Agricultores com contato")
      report.add(:deliver_food, :subcategory_list, "Entrega de Orgânicos")
      report.add(:with_local_partners, :subcategory_list, "Parceiro da produção de Sampa")
      report
    end

    def public_report
      report = PartnerReportBuilder.new(search!('*'))
      partner_klasses_names.each do |klass|
        connections_count = report.partners
          .map { |p| p.public_send(related_ids_method_for(klass)).count }
          .sum

        report.add_value("related_with_#{ klass }", connections_count)
      end
      report
    end
  end

  serialized_attributes.each do |reg_attr|
    ransacker reg_attr do |parent|
      Arel::Nodes::InfixOperation.new('->>', parent.table[:data], Arel::Nodes.build_quoted(reg_attr.to_s))
    end
  end

  # instance methods

  # searchkick
  def search_data
    to_api.search_data
  end

  def to_api
    "Api::#{ self.class.to_s }".constantize.new(self)
  end

  def publishable_params except: []
    except += %i[full_address district zip_code] unless public?
    (self.class.publishable_attributes + self.class.address_attributes + self.class.tag_attribute_list - except)
      .map { |attribute| { attribute => self.send(attribute) } }
      .reduce({}, :merge)
  end

  def tag_attribute_list
    self.class.tag_attribute_list
  end

  def avatar_attributes=(attributes)
    self.avatar = nil if has_destroy_flag?(attributes)
  end

  def lat
    return unless lonlat
    self.lonlat.lat
  end

  def lon
    return unless lonlat
    self.lonlat.lon
  end

  def region
    Region.find_by_sql("select name from regions where kind = #{ Region.kinds[:region] } AND ST_COVERS(regions.geom, (select lonlat from partners where id = #{ id }))").map(&:name)
  end

  partner_klasses_names.each do |kind|
    method_name = "#{ kind }_ids"
    define_method(kind.pluralize) do
      related_partners.where(type: kind.camelcase)
    end

    define_method(method_name) do
      self.send(kind.pluralize).pluck(:id)
    end

    define_method("#{ method_name }=") do |new_partners_ids|
      self.remove_related_partners(self.send(method_name))
      self.related_partner_ids += new_partners_ids
    end
  end

  def remove_related_partners ids
    self.related_partners.delete(self.related_partners.where(id: ids))
  end

  def after_add_related_partners new_partner
    return unless new_partner.related_partner_ids.exclude?(id)
    new_partner.related_partners << self
    new_partner.reindex
  end

  def after_add_connection added_connection
    connected_partners = added_connection.partners.where.not(id: id)
    connected_partners.map(&:reindex)
  end

  def after_remove_connection removed_connection
    connected_partners = removed_connection.partners.where.not(id: id)
    return if connected_partners.count > 1
    removed_connection.destroy
    connected_partners.map(&:reindex)
  end

  def after_remove_related_partners removed_partner
    removed_partner.remove_related_partners(id)
    removed_partner.reindex
  end

  def related_partner_list= names
    names = names.to_s.split(',')
    return if names.empty?
    self.related_partner_ids = Partner.where(name: names).pluck(:id)
  end

  def self.default_values
    Api::Config.data[:default_values][name.downcase.to_sym]
  end

  def tags_list= values
    values = values.split(/\s*[,;]\s* |\s{2,}|[\r\n]+/x).select {|value| value.present?} if values.is_a?(String)
    self.tag_list=values if values.present?
  end

  def registration_phone_list= numbers
    numbers.split(',').each do |phone_number|
      phones.build(phone_number: phone_number, scope: :registration)
    end
  end

  def registration_phone
    phones.registration.last&.phone_number
  end

  def registration_phone= number
    phones.registration.destroy_all
    phones.build(phone_number: number, scope: :registration) unless number.blank?
  end

  def registration_phone_0
    phones.registration.order(:id)[0]&.phone_number
  end

  def registration_phone_1
    phones.registration.order(:id)[1]&.phone_number
  end

  def registration_phone_0= number
    phones.registration.order(:id)[0]&.destroy
    phones.build(phone_number: number, scope: :registration) unless number.blank?
  end

  def registration_phone_1= number
    phones.registration.order(:id)[1]&.destroy
    phones.build(phone_number: number, scope: :registration) unless number.blank?
  end

  def cultivated_area_range
    cultivated_area
  end

  def self.to_csv
    content = CSV.generate(headers: true, col_sep: ';') do |csv|
      all.each_with_index do |partner, index|
        partner = Integration::Partner.new(partner)
        csv << PartnerSerializer.new(partner).call.keys.map { |attr| partner.type.constantize.human_attribute_name(attr) } if index.zero?
        csv << PartnerSerializer.new(partner).call.values
      end
    end
    "\uFEFF" + content
  end

  def tag_options context
    ActsAsTaggableOn::Tag.joins(:taggings).
      where(taggings: { taggable_id: subcategories.pluck(:id),
                        taggable_type: Subcategory.name,
                        context: context }).
                        or(
                          ActsAsTaggableOn::Tag.joins(:taggings).
                          where(taggings: { taggable_id: id,
                                            taggable_type: Partner.name,
                                            context: context })
    ).order('taggable_type desc')
  end

  def partners
    super.approved.where.not(id: id)
  end

  def category_name
    category&.name
  end

  def category_name= cat_name
    self.category = Category.where("lower(name) = ?", cat_name.downcase).
      first_or_initialize(name: cat_name)
  end

  def detail
    name
  end

  def publish_full_address_on_list?
    publish_address? and subcategories.full_address_everywhere.any?
  end

  def publish_only_resume_address?
    subcategories.only_resume_address.any?
  end

  def notifiable_name
    self.name
  end

  def moderators
    User.with_role(:admin) + User.with_role(partner_kind)
  end

  def moderator_emails
    Set.new(moderators).pluck(:email)
  end

  def integrated?
    idec? || geosampa? || upa?
  end

  private

  def partner_kind
    return "agriculture" if agriculture?
    return "integrated_market" if idec? or geosampa?
    return "rural_experience" if rural_experience?
    type.downcase.to_s
  end

  def schedule_reindex
    PartnerJob.perform_later(self)
  end

  def filters!
    return unless approved?
    CreateFilterGroupService.new(self).create_groups
    FilterGroup.reindex
  end

  def set_default_values
    default_values = self.class.default_values
    self.name = default_values[:name] if name.blank? and !sprural?
    self.source_info = "#{default_values[:source_info]}" unless source_info
  end

  def generate_api_id!
    self.api_id = SecureRandom.uuid unless api_id
  end

  def normalize_data
    self.city = DEFAULT_CITY unless city
    self.city = SpellChecker.new.correct(city) if city
  end

  def save_location
    return if _lat.to_f.zero? || _lon.to_f.zero?
    self.lonlat = "POINT(#{_lon} #{_lat})"
    self.zone = Zone.find _lon, _lat
  end

  def notify
    return unless self.persisted?
    PartnerMailer.status_changed(id, self, status_message, registration_email, status).deliver_later if status_changed? and status_message.present? and registration_email.present?
  end
end
