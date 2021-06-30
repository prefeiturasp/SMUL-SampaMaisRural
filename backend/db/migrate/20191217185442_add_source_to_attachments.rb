class AddSourceToAttachments < ActiveRecord::Migration[6.0]
  def change
    add_column :attachments, :source, :integer
  end
end
