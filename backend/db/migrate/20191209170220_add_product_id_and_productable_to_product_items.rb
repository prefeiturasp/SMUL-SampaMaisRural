class AddProductIdAndProductableToProductItems < ActiveRecord::Migration[6.0]
  def change
     add_reference :product_items, :productable, polymorphic: true, null: false
     add_reference :product_items, :product
  end
end
