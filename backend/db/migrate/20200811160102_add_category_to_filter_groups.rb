class AddCategoryToFilterGroups < ActiveRecord::Migration[6.0]
  def change
    add_column :filter_groups, :category, :string
  end
end
