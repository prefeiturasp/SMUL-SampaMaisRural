class ChangeGenderFromUpas < ActiveRecord::Migration[6.0]
  def change
    change_column :upas, :gender, 'integer USING CAST(gender AS integer)'
  end
end
