class AssociativismAsString < ActiveRecord::Migration[6.0]
  def change
    change_column :partners, :associativism, :string
  end
end
