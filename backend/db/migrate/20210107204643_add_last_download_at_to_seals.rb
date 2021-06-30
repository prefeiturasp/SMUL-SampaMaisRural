class AddLastDownloadAtToSeals < ActiveRecord::Migration[6.0]
  def change
    add_column :seals, :last_download_at, :datetime
  end
end
