class AddKindToTags < ActiveRecord::Migration[6.0]
  def change
    add_column :tags, :kind, :integer
  end
end
