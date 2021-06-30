class RemoveStartsAtAndEndsAtFromAddressesAndAddStartsAtAndEndsAtToMarkets < ActiveRecord::Migration[6.0]
  def change
    remove_column :addresses, :starts_at, :datetime
    remove_column :addresses, :ends_at, :datetime
    add_column :markets, :starts_at, :time
    add_column :markets, :ends_at, :time
  end
end
