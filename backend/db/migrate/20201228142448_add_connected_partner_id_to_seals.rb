class AddConnectedPartnerIdToSeals < ActiveRecord::Migration[6.0]
  def change
    add_column :seals, :connected_partner_id, :integer, optional: true
  end
end
