class AddPublicToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :public, :boolean, default: false
  end
end
