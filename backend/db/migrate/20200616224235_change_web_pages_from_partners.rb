class ChangeWebPagesFromPartners < ActiveRecord::Migration[6.0]
  def change
    remove_column :partners, :web_pages
    remove_column :partners, :where_find
    add_column :partners, :web_pages, :string
    add_column :partners, :where_find, :string
  end
end
