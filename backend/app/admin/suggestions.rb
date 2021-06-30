ActiveAdmin.register Suggestion do
  includes :suggestable
  menu parent: I18n.t('active_admin.management'),
    priority: 16,
    url: "/admin/#{I18n.t('routes.suggestions')}"

  permit_params Suggestion.update_params + %i[status_message]

  actions :all, except: [:new, :destroy]
  scope (I18n.t('activerecord.attributes.suggestion.statuses.pending')) { |suggestions| suggestions.pending }
  scope (I18n.t('activerecord.attributes.suggestion.statuses.approved')) { |suggestions| suggestions.approved }
  scope (I18n.t('activerecord.attributes.suggestion.statuses.refused')) { |suggestions| suggestions.refused }

  index do
    selectable_column
    id_column
    column (:status) { |s| Suggestion.human_attribute_name(s.send(:status)) }
    column (:suggestable_type) { |s| s.suggestable.category_name }
    (Suggestion.all_params - %i[suggestable_type] - Suggestion.update_params).each  do |attr|
      column attr
    end
    column :created_at
    actions
  end

  filter :status,
    as: :select,
    collection: Suggestion.statuses.map {|status, value| [Suggestion.human_attribute_name(status), value]}

# filter :suggestable_type,
#   as: :select,
#   collection: Suggestion.select(:suggestable_type)
#   .group(:suggestable_type).map(&:suggestable_type)
#   .map { |category| [category.constantize.model_name.human, category]}
  #

  show do
    attributes_table_for suggestion do
      row :name
      row :email
      row :phone
      row :message
      row (:status) { |s| Suggestion.human_attribute_name(s.send(:status)) }
      row :created_at
      row :updated_at
      row (:suggestable_type) { |s| s.suggestable.category_name }
      row (:suggestable_name) { |s| link_to(s.suggestable_name, "/admin/#{partner_url(s.suggestable)}/#{s.suggestable_id}") }
      panel I18n.t('active_admin.attachments') do
        resource.attachments.each do |attachment|
          attributes_table_for resource do
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

  form do |f|
    f.inputs do
      f.input :suggestable_type,
        input_html: {
        value: f.object.suggestable_type.constantize.model_name.human,
        disabled: true
      }
      f.input :name
      f.input :suggestable_id, input_html: { disabled: true }, as: :hidden

      f.input :suggestable_name, input_html: { disabled: true }
      f.input :suggestable_id, input_html: { disabled: true }
      f.input :status
      f.input :email
      f.input :phone
      f.input :message
    end

    render partial: 'attachments_form', locals: { f: f }
    render partial: 'form_actions', locals: { resource: f.object, f: f }
  end
end
