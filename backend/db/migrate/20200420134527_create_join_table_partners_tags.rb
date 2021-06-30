class CreateJoinTablePartnersTags < ActiveRecord::Migration[6.0]
  def change
    create_join_table :partners, :tags do |t|
      t.index [:partner_id, :tag_id]
      t.index [:tag_id, :partner_id]
    end
  end
end
