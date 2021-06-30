ActiveAdmin.register Post do
  permit_params Post.all_params
  menu parent: I18n.t('active_admin.library'),
    priority: 15

  index do
    selectable_column
    id_column
    column :title
    column :description
    column :theme_list
  end

  filter :themes, collection: PostTheme.all
  filter :created_at

  show do
    attributes_table_for post do
      row :title
      row :description
      row :link
      row :photo_url
      row :file_url
      row :theme_list
    end
  end

  form do |f|
    f.inputs do
      f.input :title
      f.input :theme_ids, as: :check_boxes, collection: PostTheme.all
      f.input :description, input_html: { maxlength: 245 }
      f.input :photo, as: :file, hint: image_tag(f.object.photo_url || "")
      li I18n.t('active_admin.file_size_warning'), class: 'warning-label'
      f.input :link
      f.input :file, as: :file, hint: (f.object.file_url || "")
      li I18n.t('active_admin.file_size_warning'), class: 'warning-label'
    end

    f.actions
  end
end
