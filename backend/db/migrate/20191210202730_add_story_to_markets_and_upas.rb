class AddStoryToMarketsAndUpas < ActiveRecord::Migration[6.0]
  def change
    add_column :markets, :story, :text
    add_column :upas, :story, :text
  end
end
