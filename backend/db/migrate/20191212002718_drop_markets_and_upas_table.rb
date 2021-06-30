class DropMarketsAndUpasTable < ActiveRecord::Migration[6.0]
  def change
    drop_table :markets
    drop_table :upas
  end
end
