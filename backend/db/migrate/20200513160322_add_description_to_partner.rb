class AddDescriptionToPartner < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :description, :text
  end
end
