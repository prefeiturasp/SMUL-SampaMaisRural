class AddPublicAttachmentsToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :public_attachments, :boolean
  end
end
