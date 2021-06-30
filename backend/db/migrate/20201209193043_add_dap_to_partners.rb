class AddDapToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :dap, :boolean, default: false
  end
end
