class AddCommercialAddressToAddresses < ActiveRecord::Migration[6.0]
  def change
    add_column :addresses, :commercial_address, :string
  end
end
