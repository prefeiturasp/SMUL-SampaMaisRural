class AddCategoryIdToSubcategories < ActiveRecord::Migration[6.0]
  def change
    add_column :subcategories, :category_id, :integer
  end
end
