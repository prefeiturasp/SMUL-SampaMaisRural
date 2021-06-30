class CreateCertificates < ActiveRecord::Migration[6.0]
  def change
    create_table :certificates do |t|
      t.string :name
      t.json :attachment

      t.timestamps
    end
  end
end
