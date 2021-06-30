class CreatePartners < ActiveRecord::Migration[6.0]
  def change
    create_table :partners do |t|
      t.json :data
      t.string :type
      t.integer :api_id
      t.string :name
      t.string :kind
      t.string :schedule
      t.json :avatar

      t.timestamps
    end
  end
end
