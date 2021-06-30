class AddReferencesToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :references, :string
  end
end
