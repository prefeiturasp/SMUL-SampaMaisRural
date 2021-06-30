class AddSlugToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :slug, :string
    add_index :partners, :slug, unique: true
  end
end
