class AddStoryToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :story, :text
  end
end
