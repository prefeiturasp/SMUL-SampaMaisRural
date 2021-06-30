class AddSourcesToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :source_info2, :string
    add_column :partners, :source_date, :string
    add_column :partners, :source_update, :string
  end
end
