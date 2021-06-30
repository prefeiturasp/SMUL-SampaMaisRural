class ChangeApiInPartners < ActiveRecord::Migration[6.0]
  def change
    change_column :partners, :api_id, :string
  end
end
