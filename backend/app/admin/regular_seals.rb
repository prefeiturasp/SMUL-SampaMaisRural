ActiveAdmin.register RegularSeal do
  menu label: I18n.t('active_admin.seal'),
    priority: 17

  before_filter :skip_sidebar!, :only => :index

  permit_params %i[expires_at status kind shareable_id shareable_type connected_partner_id description detail]

  actions :all, except: [:new, :destroy]

  scope (I18n.t('active_admin.all')) { |seals| seals }
  scope (I18n.t('activerecord.attributes.seal.active').pluralize) { |seals| seals.active }
  scope (I18n.t('activerecord.attributes.seal.without_connection').pluralize) { |seals| seals.without_connection }
  scope (I18n.t('activerecord.attributes.seal.expired').pluralize) { |seals| seals.expired }
  scope (I18n.t('activerecord.attributes.seal.arquived').pluralize) { |seals| seals.arquived }

  member_action :archive, method: :put do
    resource = scoped_collection.find(params[:id])
    notice = I18n.t('active_admin.disabled')
    if resource.arquived?
      notice = I18n.t('active_admin.enabled')
      resource.active!
    else
      resource.arquived!
    end
    redirect_to admin_regular_seals_path, notice: "#{ notice }!"
  end

  member_action :download, method: :get do
    if resource.file and resource.file.path
      respond_to do |format|
        format.html { send_file resource.download!, filename: "#{resource.shareable.name}.png" }
      end
    else
      redirect_to admin_regular_seals_path, 
        notice: "O arquivo está sendo processado. Por favor aguarde alguns instantes"
    end
  end

  batch_action :seals_as_zip do |ids|
    respond_to do |format|
      format.html {
        send_file Seal.as_zip(batch_action_collection
          .where(id: ids)
          .where.not(file: nil)),
        filename: "selos.zip"
      }
    end
  end

  action_item :new_sales_group, only: :index, method: :get do
    link_to("Novo Selo", new_admin_seals_group_path)
  end

  action_item :download, only: :show do
    link_to("Baixar selo", download_admin_regular_seal_path(resource))
  end

  index do
    selectable_column
    column :id
    column (:status) { |s| Seal.human_attribute_name(s.send(:status)) }
    column :shareable
    column :shareable_id
    column :connected_partner
    column :connected_partner_id
    column :created_at
    column :expires_at

    actions do |seal|
      item "Ver selo", download_admin_regular_seal_path(seal), class: "member_link"

      if seal.arquived?
        item I18n.t('active_admin.enable'), archive_admin_regular_seal_path(seal), method: :put
      else
        item I18n.t('active_admin.disable'), archive_admin_regular_seal_path(seal), method: :put
      end
    end
  end

  show do
    attributes_table_for regular_seal do
      row :shareable
      row :created_at
      row :updated_at
      row (:status) { |s| Seal.human_attribute_name(s.send(:status)) }
      row :connected_partner
      row :last_download_at
      row :detail
      row :description

      panel I18n.t('active_admin.labels.history'), only: :show do
        table_for resource.versions.where.not(whodunnit: nil) do
          column (:created_at) { |version| version.created_at.to_s :long }
          column (:whodunnit) { |version| User.find_by_id(version.whodunnit)&.name }
          column (:event) { |version| I18n.t('events')[version.event.to_sym] }
          column (:changed_fields) { |version| History::VersionParser.new(version.changeset).changed_fields.map { |field| Seal.human_attribute_name(field) }  }
        end
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :shareable_id,
        as: :select,
        label: RegularSeal.human_attribute_name(:shareable),
        collection: Partner.pluck(:name, :id).map,
        input_html: { disabled: true }

      f.input :status,
        as: :select,
        collection: Seal.statuses.keys.to_a
        .map {|s| [Seal.human_attribute_name(s), s]}

      f.input :expires_at, as: :datepicker
      f.input :shareable_type,
        as: :hidden,
        input_html: { value: 'Partner' }

      if f.object.shareable and f.object.shareable.partners.any?
        f.input :connected_partner_id,
          label: RegularSeal.human_attribute_name(:connected_partner),
          as: :select,
          collection: f.object.shareable.partners.pluck(:name, :id)
      end

      f.input :detail

      f.input :description, as: :text

      f.actions
    end
  end
end
