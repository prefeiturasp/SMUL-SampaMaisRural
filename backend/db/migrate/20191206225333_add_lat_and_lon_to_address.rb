class AddLatAndLonToAddress < ActiveRecord::Migration[6.0]
  def change
    remove_column :addresses, :lonlatheight
    add_column :addresses, :lat, :float
    add_column :addresses, :lon, :float
  end
end
