class AddRegularParamsToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :farms_count, :integer
    add_column :partners, :where_find, :text, array: true, default: []
    add_column :partners, :disabled_friendly_amenities, :boolean
    add_column :partners, :park, :string
    add_column :partners, :associativism, :boolean
    add_column :partners, :web_pages, :text, array: true, default: []
    add_column :partners, :zone, :string
    add_column :partners, :family_work, :boolean
    add_column :partners, :cultivated_area, :string
  end
end
