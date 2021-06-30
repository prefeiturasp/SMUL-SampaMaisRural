class ChangeOtherActiviitiesIncome < ActiveRecord::Migration[6.0]
  def change
    rename_column :upas, :other_activiities_income, :other_activities_income
  end
end
