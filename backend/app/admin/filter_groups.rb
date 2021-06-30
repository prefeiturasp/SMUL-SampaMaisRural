ActiveAdmin.register FilterGroup do
  permit_params [filters_attributes: [:id, :label, :field, {tag_list: [] }]]
  actions :all, except: [:new, :destroy]

  menu label: I18n.t('active_admin.filter_management'),
    parent: I18n.t("active_admin.management"),
    priority: 10,
    url: "/admin/#{I18n.t('routes.filter_groups')}"

  index do
    column :label
    actions
  end

  form do |f|
    f.inputs do
      f.input :label, input_html: { disabled: true }
      f.object.filters.each do |filter|
        f.fields_for :filters, filter do |filter_form|
          filter_form.input :label
          filter_form.input :field, as: :hidden
          filter_form.input :tag_list,
            as: :check_boxes,
            collection: Partner.search!('*', where: {type: f.object.category.downcase}).map(&filter.field.to_sym).flatten.uniq
        end
      end
    end
    f.actions
  end
end
