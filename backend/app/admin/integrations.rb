ActiveAdmin.register Integration do
  before_filter :skip_sidebar!, :only => :index
  actions :index, :create

  controller do
    def create
      IntegrationJob.perform_later('lib/etl/integrations.etl')
      redirect_to admin_upas_path,
        notice: "A integração foi iniciada. Em alguns instantes estará disponível na página de integrações"
    end
  end

  index do
    column :name
    column (:status) { |integration| Integration.human_attribute_name(integration.status) }
    column :created_at
    column :updated_at
  end
end
