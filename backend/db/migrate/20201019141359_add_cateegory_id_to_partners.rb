class AddCateegoryIdToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :category_id, :integer
  end
end
