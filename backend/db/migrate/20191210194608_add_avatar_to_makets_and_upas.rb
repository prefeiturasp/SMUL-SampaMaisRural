class AddAvatarToMaketsAndUpas < ActiveRecord::Migration[6.0]
  def change
    add_column :markets, :avatar, :json
    add_column :upas, :avatar, :json
  end
end
