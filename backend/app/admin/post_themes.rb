ActiveAdmin.register PostTheme do
  permit_params :name
  menu parent: I18n.t('active_admin.library'),
    priority: 15,
    url: "/admin/#{I18n.t('routes.post_themes')}"

  index do
    selectable_column
    id_column
    column :name
  end

  filter :themes, collection: PostTheme.all

  form do |f|
    f.inputs do
      f.input :name
    end

    f.actions
  end
end
