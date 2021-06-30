ActiveAdmin.register Upa do
  extend PartnerAdmin
  initialize_entity_record

  permit_params Upa.admin_permitted_params
  menu label: I18n.t('active_admin.upa'),
    priority: 2,
    url: "/admin/#{I18n.t('routes.upas')}"

  actions :all, except: [:destroy]

  scope (I18n.t('active_admin.all')) { |partners| partners }
  scope (I18n.t('active_admin.approved').pluralize) { |partners| partners.approved }
  scope (I18n.t('active_admin.pending').pluralize) { |partners| partners.pending }
  scope (I18n.t('active_admin.refused').pluralize) { |partners| partners.refused }
  scope (I18n.t('active_admin.incorporated').pluralize) { Upa.farmers.incorporated }
  scope (Upa.human_attribute_name(:waiting_integration).pluralize) { |partners| partners.waiting_integration }
  scope (I18n.t('active_admin.disabled').pluralize) { Upa.farmers.disabled }

  filter :name

  action_item :integration_sisrural, only: :index  do
    link_to("Integrar sisrural", admin_integrations_path, method: :post)
  end

  index do
    selectable_column
    column :id
    column :api_id
    column :update_via_integration
    column (:status) { |partner| Upa.human_attribute_name(partner.public_send(:status)) }
    column :name
    column :subcategory_list
    column :district
    column :responsable_name
    actions do |partner|
      if current_user.has_role?(:admin)
        if partner.disabled?
          item I18n.t('active_admin.enable'), disable_admin_upa_path(partner), method: :put
        else
          item I18n.t('active_admin.disable'), disable_admin_upa_path(partner), method: :put
        end
      end
    end
  end

  filter :id
  filter :api_id
  filter :update_via_integration
  filter :with_subcategories, label: Upa.human_attribute_name(:subcategory_list), as: :string
  filter :status, as: :select,
    collection: Partner.visible_statuses.map { |status, index| [I18n.t("active_admin.#{ status }"), index] }

  filter :responsable_name_cont, label: Upa.human_attribute_name(:responsable_name)
  filter :cpf_cont, label: Upa.human_attribute_name(:cpf)
  filter :registration_name_cont, label: Upa.human_attribute_name(:registration_name)
  filter :registration_email_cont, label: Upa.human_attribute_name(:registration_email)
  filter :phones_phone_number_cont
  filter :registration_address_cont, label: 'Endereço de cadastro'
  filter :registration_neighborhood_cont, label: 'Bairro de cadastro'
  filter :registration_zip_code_cont, label: 'CEP de cadastro'

  filter :name
  filter :with_qualifications, label: Upa.human_attribute_name(:qualification_list), as: :string
  filter :with_products, label: Upa.human_attribute_name(:product_list), as: :string
  filter :with_fruit_species, label: Upa.human_attribute_name(:fruit_specy_list), as: :string
  filter :with_where_finds, label: Upa.human_attribute_name(:where_find_list), as: :string

  filter :full_address
  filter :neighborhood
  filter :district
  filter :city
  filter :email, label: 'Email comercial'
  filter :web_pages

  filter :certificates_name_cont, label: Upa.human_attribute_name(:certificate_list), as: :string
  filter :family_work
  filter :associativism
  filter :gender_cont, label: Upa.human_attribute_name(:gender)
  filter :has_internet_access_cont, label: Upa.human_attribute_name(:has_internet_access)
  filter :source_info
  filter :source_info2

  filter :registered_by_cont, label: Upa.human_attribute_name(:registered_by)

  filter :avatar_not_null, as: :boolean
  filter :attachments_id_not_null, as: :boolean

  member_action :disable, method: :put do
    resource = Upa.friendly.find(params[:id])
    notice = I18n.t('active_admin.disabled')
    if resource.disabled?
      notice = I18n.t('active_admin.enabled')
      resource.pending!
    else
      resource.disabled!
    end
    redirect_to admin_upas_path, notice: "#{ notice }!"
  end

  controller do
    def scoped_collection
      Upa.farmers
    end
  end

  show do
    panel I18n.t('active_admin.labels.form.general_info') do
      attributes_table_for upa do
        row :id
        row :api_id
        row :update_via_integration
        row :publish_address
        row (:status) { |partner| Upa.human_attribute_name(partner.public_send(:status)) }
      end
    end

    if upa.upa? or upa.sprural?
        panel I18n.t('active_admin.labels.form.upa_info') do
          attributes_table_for upa do
            row :responsable_name
            row :cpf
            row :registration_name
            row :registration_phone_0
            row :registration_phone_1
            row :registration_address
            row :registration_neighborhood
            row :registration_zip_code
            row :registration_email
            row :cnpj
            row :cnae
            row :company_activity
          end
        end
      end
      if upa.api?
        panel I18n.t('active_admin.labels.form.registration_info') do
          attributes_table_for upa do
            row 'Nome de Contato - automapeamento' do
              (resource.registration_name || resource.responsable_name)
            end
            row 'CPF - automapeamento' do
              resource.cpf
            end
            row 'E-mail automapeamento' do
              resource.registration_email
            end
            row :registration_phone_0
            row :registration_phone_1
          end
        end
      end

    panel I18n.t('active_admin.labels.form.basic_info') do
      attributes_table_for upa do
        row :category_name
        row :subcategory_list
        row :name
        row :qualification_list
        row :product_list
        row :fruit_specy_list
        row :where_find_list
        row :certificate_list
        row :who_sells_details
      end
    end

    panel I18n.t('active_admin.labels.form.address') do
      attributes_table_for upa do
        row :full_address
        row :neighborhood
        row :zip_code
        row :district
        row :city
        row :zone

        resource.phones.commercial.each_with_index do |phone, index|
          attributes_table_for phone do
            row "Telefone #{index+1}"do
              "#{phone.phone_number} - #{phone.kind}"
            end
          end
        end

        row :email
        row :web_pages
        row :contact
        row :other_contact

        row (:connections) { |resource| resource.partners.pluck(:name) }
      end
    end

    panel I18n.t('active_admin.labels.form.complementary_info') do
      attributes_table_for upa do
        row :description
        row :cultivated_area
        row :area
        row :family_work
        row :associativism
        row :dap
        row :birthdate
        row :gender
        row :has_internet_access
        row :source_info
        row :source_date
        row :source_info2
        row :source_update
      end
    end

    panel I18n.t('active_admin.labels.form.management_information') do
      attributes_table_for upa do
        row :registered_by
        row :source
        row :other_information
      end
    end

    panel I18n.t('active_admin.labels.form.pics_and_map') do
      attributes_table_for upa do
        panel I18n.t('active_admin.attachments') do
          upa.attachments.each do |attachment|
            attributes_table_for upa do
              row (:attachment) do |partner|
                span do
                  image_tag attachment.site_version_url
                end
              end
            end
          end
        end

        row :avatar do |partner|
          if partner.avatar_url
            image_tag partner.avatar_url
          end
        end

        row :lat
        row :lon
      end
    end

    panel I18n.t('activerecord.models.regular_seal') do
      table_for resource.regular_seals do
        column (:id) { |seal| link_to seal.id, admin_regular_seal_path(seal.id) }
        column (:status) { |seal| Seal.human_attribute_name(seal.send(:status)) }
        column (:connected_partner) { |seal| seal.connected_partner }
        column (:connected_partner_id) { |seal| seal.connected_partner_id }
        column (:created_at) { |seal| seal.created_at }
        column (:expires_at) { |seal| seal.expires_at }
      end
    end

    panel I18n.t('active_admin.labels.history'), only: :show do
      table_for resource.versions do
        column (:created_at) { |version| version.created_at.to_s :long }
        column (:whodunnit) { |version| User.find_by_id(version.whodunnit)&.name }
        column (:event) { |version| I18n.t('events')[version.event.to_sym] }
        column (:changed_fields) { |version| History::VersionParser.new(version.changeset).changed_fields.map { |field| Partner.human_attribute_name(field) }  }
      end
    end
  end

  form do |f|
    render 'upa_form', { f: f }
  end
end
