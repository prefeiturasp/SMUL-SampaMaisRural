class AddOriginToAttachments < ActiveRecord::Migration[6.0]
  def change
    add_column :attachments, :origin, :integer
  end
end
