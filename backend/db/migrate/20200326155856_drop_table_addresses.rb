class DropTableAddresses < ActiveRecord::Migration[6.0]
  def change
    drop_table :addresses
  end
end
