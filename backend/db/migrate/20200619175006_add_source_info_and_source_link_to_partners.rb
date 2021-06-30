class AddSourceInfoAndSourceLinkToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :source_info, :string
    add_column :partners, :source_link, :string
  end
end
