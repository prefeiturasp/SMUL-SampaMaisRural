class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :description
      t.json :photo
      t.json :file
      t.string :link

      t.timestamps
    end
  end
end
