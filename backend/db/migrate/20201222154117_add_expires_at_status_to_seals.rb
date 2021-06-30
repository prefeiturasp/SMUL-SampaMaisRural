class AddExpiresAtStatusToSeals < ActiveRecord::Migration[6.0]
  def change
    add_column :seals, :expires_at, :date
    add_column :seals, :status, :integer
    add_column :seals, :kind, :integer
  end
end
