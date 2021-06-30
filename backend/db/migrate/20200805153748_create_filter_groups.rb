class CreateFilterGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :filter_groups do |t|
      t.string :name
      t.text :filters, array:  true, default: [:zone]

      t.timestamps
    end
  end
end
