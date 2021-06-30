class ChangePublicDefault < ActiveRecord::Migration[6.0]
  def change
    change_column_default :partners, :public, false
  end
end
