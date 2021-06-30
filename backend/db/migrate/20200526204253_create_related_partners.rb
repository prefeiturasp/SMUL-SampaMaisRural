class CreateRelatedPartners < ActiveRecord::Migration[6.0]
  def change
    create_table :related_partners do |t|
      t.integer :partner_id
      t.integer :related_partner_id
    end
    add_index(:related_partners, [:partner_id, :related_partner_id], unique: true)
    add_index(:related_partners, [:related_partner_id, :partner_id], unique: true)
  end
end
