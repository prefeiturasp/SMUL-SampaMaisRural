class MoveApiPartnersToCategories < ActiveRecord::Migration[6.0]
  def change
    Partner.find_each do |partner|
      category_name = translate_category[partner.type.downcase.to_sym]
      category = Category.where("lower(name) = ?", category_name.downcase).first_or_create(name: category_name)
      partner.category = category
      partner.save
    end
  end

  def translate_category
    { tourism: "Turismo e Vivência Rural",
      initiative: "Iniciativas",
      upa: "Agricultura",
      market: "Mercados" }
  end
end
