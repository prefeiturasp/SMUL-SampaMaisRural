class CreateProductItems < ActiveRecord::Migration[6.0]
  def change
    create_table :product_items do |t|
      t.integer :kind

      t.timestamps
    end
  end
end
