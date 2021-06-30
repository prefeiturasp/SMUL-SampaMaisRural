class CreateJoinTablePostPostThemes < ActiveRecord::Migration[6.0]
  def change
    create_join_table :posts, :post_themes do |t|
      # t.index [:post_id, :post_theme_id]
      # t.index [:post_theme_id, :post_id]
    end
  end
end
