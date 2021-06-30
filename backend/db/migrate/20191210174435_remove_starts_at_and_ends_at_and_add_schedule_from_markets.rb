class RemoveStartsAtAndEndsAtAndAddScheduleFromMarkets < ActiveRecord::Migration[6.0]
  def change
    remove_column :markets, :starts_at
    remove_column :markets, :ends_at
    add_column :markets, :schedule, :string
  end
end
