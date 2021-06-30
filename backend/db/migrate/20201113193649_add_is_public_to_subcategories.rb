class AddIsPublicToSubcategories < ActiveRecord::Migration[6.0]
  def change
    add_column :subcategories, :is_public, :boolean
  end
end
