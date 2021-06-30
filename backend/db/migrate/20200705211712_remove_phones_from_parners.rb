class RemovePhonesFromParners < ActiveRecord::Migration[6.0]
  def change
    remove_column :partners, :phones
  end
end
