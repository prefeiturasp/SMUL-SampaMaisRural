class AddHasInternetAccessToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :has_internet_access, :boolean
  end
end
