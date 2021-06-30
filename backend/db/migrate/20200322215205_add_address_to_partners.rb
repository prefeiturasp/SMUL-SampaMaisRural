class AddAddressToPartners < ActiveRecord::Migration[6.0]
  def change
    change_table :partners do |t|
      t.string :district
      t.string :full_address
      t.string :neighborhood
      t.string :city
      t.string :state
      t.string :zip_code
      t.string  :registration_address
      t.st_point :lonlat, geographic: true
    end
  end
end
