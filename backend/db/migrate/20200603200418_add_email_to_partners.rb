class AddEmailToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :email, :string
  end
end
