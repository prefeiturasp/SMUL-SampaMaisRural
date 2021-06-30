class ChangePublicDefaultValue < ActiveRecord::Migration[6.0]
  def change
    change_column :partners, :public, :boolean, default: true
  end
end
