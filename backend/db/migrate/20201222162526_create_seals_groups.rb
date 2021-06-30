class CreateSealsGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :seals_groups do |t|

      t.timestamps
    end
  end
end
