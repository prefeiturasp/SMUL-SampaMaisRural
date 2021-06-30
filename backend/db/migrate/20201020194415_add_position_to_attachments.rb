class AddPositionToAttachments < ActiveRecord::Migration[6.0]
  def change
    add_column :attachments, :position, :integer
  end
end
