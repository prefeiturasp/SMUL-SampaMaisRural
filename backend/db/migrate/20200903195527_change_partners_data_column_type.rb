class ChangePartnersDataColumnType < ActiveRecord::Migration[6.0]
  def up
    enable_extension 'citext'
    data = {}
    change_column :partners, :data, :jsonb
    add_index :partners, :data, using: :gin
    Upa.find_each do |partner|
      # save as jsonb
      partner.data = partner.data
      partner.birthdate = partner.birthdate
      partner.save
    end
  end

  def down
    remove_index :partners, :data
    change_column :partners, :data, :json
  end
end
