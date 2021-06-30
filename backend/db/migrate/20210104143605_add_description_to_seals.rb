class AddDescriptionToSeals < ActiveRecord::Migration[6.0]
  def change
    add_column :seals, :description, :text
  end
end
