class AddSealsToCategories < ActiveRecord::Migration[6.0]
  def change
    Category.find_each do |category|
      file = File.open("public/seals/seal-#{category.name.parameterize}.png")
      category.create_seal(file: file)
    end
  end
end
