class AddPhonesToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :phones, :json
  end
end
