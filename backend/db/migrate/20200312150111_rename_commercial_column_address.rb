class RenameCommercialColumnAddress < ActiveRecord::Migration[6.0]
  def change
    rename_column :addresses, :commercial_address, :registration_address
  end
end
