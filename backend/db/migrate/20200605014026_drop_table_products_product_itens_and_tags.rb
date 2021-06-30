class DropTableProductsProductItensAndTags < ActiveRecord::Migration[6.0]
  def change
    drop_table :product_items
    drop_table :products
  end
end
