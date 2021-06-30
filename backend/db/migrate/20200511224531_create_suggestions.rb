class CreateSuggestions < ActiveRecord::Migration[6.0]
  def change
    create_table :suggestions do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.text :message
      t.integer :status, default: 0, null: false

      t.timestamps
    end
  end
end
