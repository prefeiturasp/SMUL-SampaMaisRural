ActiveAdmin.register Comment, as: 'PartnerComment' do
  permit_params %i[status status_message]
  menu parent: I18n.t('active_admin.management'),
    priority: 17,
    url: "/admin/#{I18n.t('routes.partner_comments')}"

  actions :all, except: %i[new destroy]
  scope (I18n.t('activerecord.attributes.comment.statuses.pending')) { |comments| comments.pending }
  scope (I18n.t('activerecord.attributes.comment.statuses.approved')) { |comments| comments.approved }
  scope (I18n.t('activerecord.attributes.comment.statuses.refused')) { |comments| comments.refused }

  index do
    selectable_column
    id_column
    column (:status) { |s| Comment.human_attribute_name(s.send(:status)) }
    column :name
    column :email
    column :data
    column :partner_name
    actions
  end

  show do
    attributes_table_for partner_comment do
      row (:status) { |s| Comment.human_attribute_name(s.send(:status)) }
      row :name
      row :email
      row :data
      row :partner_name
      row :created_at
      if partner_comment.approved?
        row (:approved_at) { partner_comment.updated_at }
      end
      if partner_comment.refused?
        row (:refused_at) { partner_comment.updated_at }
      end
    end
  end

  filter :status,
    as: :select,
    collection: Comment.statuses.map { |status, value| [Comment.human_attribute_name(status), value]}

  form do |f|
    f.inputs do
      f.input :name, input_html: { disabled: true }
      f.input :email, input_html: { disabled: true }
      f.input :partner_name, input_html: { disabled: true }
      f.input :partner_id, input_html: { disabled: true }, as: :hidden
      f.input :status, as: :select,
        collection: Comment.statuses.keys.to_a
        .map {|s| [Comment.human_attribute_name(s), s]}
      f.input :data, input_html: { disabled: true }
    end
    render partial: 'form_actions', locals: { resource: f.object, f: f }
  end
end
