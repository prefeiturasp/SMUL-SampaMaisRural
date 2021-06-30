ActiveAdmin.register Certificate do
  permit_params [:name, :attachment]
  menu parent: I18n.t('active_admin.management'),
    priority: 19

  index do
    id_column
    column :name
    actions
  end

  show do
    attributes_table_for resource do
      row :name
      row (:attachment) { |resource| image_tag(resource.attachment&.url.to_s) }
    end
  end

  form do |f|
    f.inputs do
      f.input :name, input_html: { disabled: true }
      f.input :attachment, as: :file, hint: image_tag(f.object.attachment.url.to_s)
    end
    f.actions
  end
end
