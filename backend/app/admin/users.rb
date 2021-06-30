ActiveAdmin.register User do
  permit_params :name, :email, :password, :password_confirmation, roles: []

  menu parent: I18n.t("active_admin.management"),
    priority: 12,
    url: "/admin/#{I18n.t('routes.users')}"

  before_filter :skip_sidebar!, :only => :index
  actions :all, except: [:show]

  index do
    selectable_column
    id_column
    column :name
    column :email
    column :created_at
    column (:roles) { |user| user.roles.map { |role| (I18n.t('active_admin')[role.to_sym] || role.capitalize) } }
    actions
  end

  show do
    attributes_table_for user do
      row :email
      row :name
      row (:roles) { user.roles.map { |role| (I18n.t('active_admin')[role.to_sym] || role.capitalize) } }
    end
  end

  form do |f|
    f.inputs do
      f.input :name, input_html: { disabled: !current_user.has_role?(:admin) }
      f.input :email
      f.input :password
      f.input :password_confirmation
      if current_user.has_role?(:admin)
        f.input :roles, as: :check_boxes,
          collection: User.roles.values.map { |role| [(I18n.t('active_admin')[role.to_sym] || role.capitalize), role] }
      end
    end
    f.actions
  end

  controller do
    def update_resource(object, attributes)
      update_method = attributes.first[:password].present? ? :update_attributes : :update_without_password
      object.send(update_method, *attributes)
    end
  end
end
