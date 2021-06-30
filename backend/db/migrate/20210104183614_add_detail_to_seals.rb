class AddDetailToSeals < ActiveRecord::Migration[6.0]
  def change
    add_column :seals, :detail, :string
  end
end
