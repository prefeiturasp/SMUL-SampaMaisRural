class AddSourceToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :source, :integer
  end
end
