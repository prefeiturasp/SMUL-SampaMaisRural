ActiveAdmin.register Market do
  extend PartnerAdmin
  initialize_entity_record

  permit_params Market.admin_permitted_params
  menu label: I18n.t('active_admin.market'), priority: 4, url: "/admin/#{I18n.t('routes.markets')}"

  actions :all, except: [:destroy]

  scope (I18n.t('active_admin.all')) { |partners| partners }
  scope (I18n.t('active_admin.approved').pluralize) { |partners| partners.approved }
  scope (I18n.t('active_admin.pending').pluralize) { |partners| partners.pending }
  scope (I18n.t('active_admin.refused').pluralize) { |partners| partners.refused }
  scope (I18n.t('active_admin.incorporated').pluralize) { Market.not_idec.incorporated }
  scope (I18n.t('active_admin.disabled').pluralize) { Market.not_idec.not_geosampa.disabled }

  index do
    selectable_column
    column :id
    column :api_id
    column (:status) { |partner| I18n.t("active_admin.#{ partner.status }") }
    column :name
    column :subcategory_list
    column :district
    column :responsable_name
    actions do |partner|
      if current_user.has_role?(:admin)
        if partner.disabled?
          item I18n.t('active_admin.enable'), disable_admin_market_path(partner), method: :put
        else
          item I18n.t('active_admin.disable'), disable_admin_market_path(partner), method: :put
        end
      end
    end
  end

  filter :id
  filter :api_id
  filter :status, as: :select,
    collection: Partner.visible_statuses.map { |status, index| [I18n.t("active_admin.#{ status }"), index] }
  filter :with_subcategories, label: Market.human_attribute_name(:subcategory_list), as: :string
  filter :name
  filter :with_qualifications, label: Market.human_attribute_name(:qualification_list), as: :string
  filter :with_products, label: Market.human_attribute_name(:product_list), as: :string

  filter :full_address
  filter :neighborhood
  filter :zip_code
  filter :district
  filter :city
  filter :phones_phone_number_cont
  filter :email, label: 'Email comercial'
  filter :web_pages

  filter :associativism
  filter :disabled_friendly_amenities
  filter :gender_cont, label: Market.human_attribute_name(:gender)
  filter :source_info
  filter :source_info2

  filter :responsable_name_cont, label: Market.human_attribute_name(:responsable_name)
  filter :zip_code

  filter :avatar_not_null, as: :boolean
  filter :attachments_id_not_null, as: :boolean

  member_action :disable, method: :put do
    resource = Market.friendly.find(params[:id])
    notice = I18n.t('active_admin.disabled')
    if resource.disabled?
      notice = I18n.t('active_admin.enabled')
      resource.pending!
    else
      resource.disabled!
    end
    redirect_to admin_markets_path, notice: "#{ notice }!"
  end

  controller do
    def scoped_collection
      Market.not_idec.not_geosampa
    end
  end

  show do
     render 'partner', { resource: resource, context: self }
  end

  form do |f|
    render 'market_form', { f: f }
  end
end
