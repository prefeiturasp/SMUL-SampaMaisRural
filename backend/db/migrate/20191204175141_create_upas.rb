class CreateUpas < ActiveRecord::Migration[6.0]
  def change
    create_table :upas do |t|
      t.integer :api_id
      t.string :cpf
      t.string :source
      t.string :interviewed_name
      t.string :phone
      t.string :cellphone
      t.string :interviewed_job_role
      t.boolean :cnpj
      t.string :dap
      t.string :associativism
      t.boolean :uses_pesticide
      t.string :organic_production
      t.string :other_activities
      t.string :other_activiities_income
      t.boolean :gender
      t.integer :birthdate_year
      t.string :educational_level
      t.string :family_income
      t.string :interviewed_situation
      t.string :marketing_channel

      t.timestamps
    end
  end
end
