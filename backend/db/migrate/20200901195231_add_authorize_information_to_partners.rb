class AddAuthorizeInformationToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :authorize_information, :boolean, default: false
  end
end
