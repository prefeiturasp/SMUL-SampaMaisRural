class CreateAttachments < ActiveRecord::Migration[6.0]
  def change
    create_table :attachments do |t|
      t.json :file
      t.references :attachmentable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
