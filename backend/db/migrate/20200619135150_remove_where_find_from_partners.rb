class RemoveWhereFindFromPartners < ActiveRecord::Migration[6.0]
  def change
    remove_column :partners, :where_find
  end
end
