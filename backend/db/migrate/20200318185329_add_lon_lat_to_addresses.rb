class AddLonLatToAddresses < ActiveRecord::Migration[6.0]
  def change
    change_table :addresses do |t|
      t.st_point :lonlat, geographic: true
    end
  end
end
