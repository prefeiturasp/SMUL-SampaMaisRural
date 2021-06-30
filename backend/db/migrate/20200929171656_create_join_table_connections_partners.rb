class CreateJoinTableConnectionsPartners < ActiveRecord::Migration[6.0]
  def change
    create_join_table :connections, :partners do |t|
      t.index [:connection_id, :partner_id]
      t.index [:partner_id, :connection_id]
    end
  end
end
