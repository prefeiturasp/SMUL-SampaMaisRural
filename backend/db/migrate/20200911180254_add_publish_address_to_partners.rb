class AddPublishAddressToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :publish_address, :boolean, default: true
  end
end
