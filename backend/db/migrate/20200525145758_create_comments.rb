class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :name
      t.string :email
      t.text :data
      t.integer :status, default: 0
      t.integer :partner_id

      t.timestamps
    end
  end
end
