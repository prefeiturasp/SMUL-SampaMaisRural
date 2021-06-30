class AddFileToImportedFiles < ActiveRecord::Migration[6.0]
  def change
    add_column :imported_files, :file, :json
  end
end
