class AddStatusToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :status, :integer,  default: 0
  end
end
