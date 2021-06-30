ActiveAdmin.register Message do
  actions :all, except: %i[new destroy]
  permit_params %i[status]

  menu parent: I18n.t("active_admin.management"),
    priority: 11,
    url: "/admin/#{I18n.t('routes.messages')}"

  scope (I18n.t('activerecord.attributes.message.statuses.pending')) { |messages| messages.pending }
  scope (I18n.t('activerecord.attributes.message.statuses.answered')) { |messages| messages.answered }
  scope (I18n.t('activerecord.attributes.message.statuses.refused')) { |messages| messages.refused }

  filter :status,
    as: :select,
    collection: Message.statuses.map { |status, value| [Message.human_attribute_name(status), value]}
  filter :name
  filter :email
  filter :phone
  filter :message
  filter :created_at
  filter :updated_at

  index do
    selectable_column
    id_column
    column :name
    column :email
    column (:status) { |message| Message.human_attribute_name(message.public_send(:status)) }

    actions
  end

  show do
    attributes_table_for message do
      row (:status) { |s| Message.human_attribute_name(s.send(:status)) }
      row :name
      row :email
      row :phone
      row :message
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs do
      f.input :name, input_html: { disabled: true }
      f.input :status, as: :select,
        collection: Message.statuses.keys.to_a
        .map {|s| [Message.human_attribute_name(s), s]}
      f.input :email, input_html: { disabled: true }
      f.input :phone, input_html: { disabled: true }
      f.input :message, input_html: { disabled: true }
    end
    f.actions
  end
end
