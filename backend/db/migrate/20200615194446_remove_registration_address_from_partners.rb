class RemoveRegistrationAddressFromPartners < ActiveRecord::Migration[6.0]
  def change
    remove_column :partners, :registration_address
  end
end
