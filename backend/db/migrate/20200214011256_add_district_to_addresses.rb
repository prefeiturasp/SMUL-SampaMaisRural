class AddDistrictToAddresses < ActiveRecord::Migration[6.0]
  def change
    add_column :addresses, :district, :string
  end
end
