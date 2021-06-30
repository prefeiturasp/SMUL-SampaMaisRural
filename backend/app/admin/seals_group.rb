ActiveAdmin.register SealsGroup do
  actions :all, except: [:edit, :destroy]
  menu false

  permit_params [
    :additional_seals,
    :partner_id,
    :expires_at,
    :detail,
    connected_partner_ids: []
  ]

  controller do
    def create
      super do |success, failure|
        success.html { redirect_to admin_regular_seals_path }
        failure.html { render :new }
      end
    end
  end

  form html: { id: 'seals-group-form' } do |f|
    f.inputs do
      f.input :partner_id,
        label: RegularSeal.human_attribute_name(:shareable),
        input_html: {
        id: 'partner-select',
        data: { to: "shareable_id" }
      },
      as: :search_select,
      url: '/admin/search_partners',
      fields: [:name, :id],
      display_name: 'name',
      minimum_input_length: 2,
      order_by: 'name'

      f.input :expires_at, as: :datepicker,
        datepicker_options: {
        min_date: Date.today.to_date
      },
      input_html: { value: 1.year.from_now.to_date }

      f.input :connected_partner_ids, 
        label: RegularSeal.human_attribute_name(:connected_partner),
        as: :check_boxes

      f.input :detail

      f.input :additional_seals, as: :number

      f.actions
    end
  end
end
