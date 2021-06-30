class CreatePesticides < ActiveRecord::Migration[6.0]
  def change
    create_table :pesticides do |t|
      t.string :name

      t.timestamps
    end
  end
end
