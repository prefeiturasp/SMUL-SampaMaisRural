class CreateFilters < ActiveRecord::Migration[6.0]
  def change
    create_table :filters do |t|
      t.integer :group_id
      t.integer :field
      t.string :label

      t.timestamps
    end
  end
end
