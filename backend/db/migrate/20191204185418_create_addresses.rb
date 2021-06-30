class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.string :state
      t.string :city
      t.string :full_address
      t.integer :area
      t.datetime :starts_at
      t.datetime :ends_at
      t.string :reference
      t.string :zip_code
      t.point :lonlatheight, :geographic => true, :has_z => true

      t.timestamps
    end
  end
end
