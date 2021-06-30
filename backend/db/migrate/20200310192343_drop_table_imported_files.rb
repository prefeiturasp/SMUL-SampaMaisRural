class DropTableImportedFiles < ActiveRecord::Migration[6.0]
  def change
    drop_table :imported_files
  end
end
