class AddIndexToLatLon < ActiveRecord::Migration[6.0]
  def change
    add_index :partners, :lonlat, using: :gist
  end
end
