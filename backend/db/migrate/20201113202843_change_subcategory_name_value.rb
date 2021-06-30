class ChangeSubcategoryNameValue < ActiveRecord::Migration[6.0]
  def change
    Subcategory.find_by(name: "Parceiro da Produção Local").try(:update, {name: "Parceiro da produção de Sampa"})
    ActsAsTaggableOn::Tag.where(name: "Parceiro da Produção Local").update_all(name: "Parceiro da produção de Sampa")
  end
end
