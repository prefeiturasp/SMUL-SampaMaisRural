class AddRolesToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :roles, :text, array: true, default: []
  end
end
