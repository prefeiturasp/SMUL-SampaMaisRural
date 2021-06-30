class RemoveKindFromSealsAndAddTypeFromSeals < ActiveRecord::Migration[6.0]
  def change
    remove_column :seals, :kind
    add_column :seals, :type, :string
  end
end
