class DropFiltersFromFilterGroups < ActiveRecord::Migration[6.0]
  def change
    remove_column :filter_groups, :filters
  end
end
