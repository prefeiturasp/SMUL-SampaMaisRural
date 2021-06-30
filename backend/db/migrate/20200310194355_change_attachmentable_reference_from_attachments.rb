class ChangeAttachmentableReferenceFromAttachments < ActiveRecord::Migration[6.0]
  def change
    remove_column :attachments, :attachmentable_id
    remove_column :attachments, :attachmentable_type
    add_reference :attachments, :attachmentable, polymorphic: true, null: true
  end
end
