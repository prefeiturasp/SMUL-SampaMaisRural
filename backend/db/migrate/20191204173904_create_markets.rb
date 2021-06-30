class CreateMarkets < ActiveRecord::Migration[6.0]
  def change
    create_table :markets do |t|
      t.integer :api_id
      t.string :name
      t.string :kind

      t.timestamps
    end
  end
end
