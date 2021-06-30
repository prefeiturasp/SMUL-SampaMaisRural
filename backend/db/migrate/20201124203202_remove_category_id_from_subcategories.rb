class RemoveCategoryIdFromSubcategories < ActiveRecord::Migration[6.0]
  def change
    remove_column :subcategories, :category_id
  end
end
