class CreateImportedFiles < ActiveRecord::Migration[6.0]
  def change
    create_table :imported_files do |t|

      t.timestamps
    end
  end
end
