ActiveAdmin.register Subcategory do
  permit_params %i[is_public] + [Attachment.file_params]
  menu parent: I18n.t('active_admin.management'),
    priority: 18,
    url: "/admin/#{I18n.t('routes.subcategories')}"
  actions :all, except: [:destroy, :new]
  before_filter :skip_sidebar!, :only => :index

  show do
    attributes_table_for subcategory do
      row :name
      row :is_public
      attributes_table_for subcategory do
        panel I18n.t('active_admin.attachments') do
          subcategory.attachments.each do |attachment|
            attributes_table_for subcategory do
              row (:attachment) do
                span do
                  image_tag attachment.file_url
                end
              end
            end
          end
        end
      end
    end
  end

  index do
    column :name
    column :is_public
    actions
  end

  form do |f|
    f.inputs do
      f.input :name, input_html: { disabled: true }
      f.input :is_public
      render partial: 'attachments_form', locals: { f: f }
      f.actions
    end
  end
end
