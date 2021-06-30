class CreateJoinTablePartnersSubcategories < ActiveRecord::Migration[6.0]
  def change
    create_join_table :partners, :subcategories do |t|
      t.index [:partner_id, :subcategory_id]
      t.index [:subcategory_id, :partner_id]
    end
  end
end
