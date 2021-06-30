class CreateIntegrations < ActiveRecord::Migration[6.0]
  def change
    create_table :integrations do |t|
      t.string :name
      t.integer :status, default: 0
      t.text :message

      t.timestamps
    end
  end
end
