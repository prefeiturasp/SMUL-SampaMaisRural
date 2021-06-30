class FixSubcategories < ActiveRecord::Migration[6.0]
  def change
    ActsAsTaggableOn::Tagging.
      where(context: 'subcategories', taggable_type: 'Partner').find_each do |tagging|
      partner = tagging.taggable
      partner.add_subcategory_list = [tagging.tag.name]
      partner.save
    end
    ActsAsTaggableOn::Tag.where(name: ['Entrega de Orgânicos, Parceiro da Produção Local', 'Agricultor/a', 'Restaurantes com Ingredientes Orgânicos']).destroy_all
  end
end
