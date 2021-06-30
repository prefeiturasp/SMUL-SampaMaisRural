class CreateSeals < ActiveRecord::Migration[6.0]
  def change
    create_table :seals do |t|
      t.references :shareable, polymorphic: true, null: false, index: true
      t.json :file
      t.json :qr_code

      t.timestamps
    end
  end
end
