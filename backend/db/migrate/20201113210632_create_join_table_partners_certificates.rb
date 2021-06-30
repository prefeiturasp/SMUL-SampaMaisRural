class CreateJoinTablePartnersCertificates < ActiveRecord::Migration[6.0]
  def change
    create_join_table :partners, :certificates do |t|
      t.index [:partner_id, :certificate_id]
      t.index [:certificate_id, :partner_id]
    end
  end
end
