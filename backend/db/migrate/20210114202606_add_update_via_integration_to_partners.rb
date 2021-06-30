class AddUpdateViaIntegrationToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :update_via_integration, :boolean, default: false
  end
end
