class AddSealGroupIdToSeals < ActiveRecord::Migration[6.0]
  def change
    add_column :seals, :seals_group_id, :integer, optional: true
  end
end
