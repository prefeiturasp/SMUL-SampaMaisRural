class CreatePhones < ActiveRecord::Migration[6.0]
  def change
    create_table :phones do |t|
      t.string :kind
      t.integer :scope
      t.string :phone_number
      t.integer :partner_id

      t.timestamps
    end
  end
end
