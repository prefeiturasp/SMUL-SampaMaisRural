class ChangeSourceDefault < ActiveRecord::Migration[6.0]
  def change
    change_column_default :partners, :source, Partner.sources[:sprural]
  end
end
