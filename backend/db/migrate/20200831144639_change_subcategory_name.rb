class ChangeSubcategoryName < ActiveRecord::Migration[6.0]
  def change
    tag = ActsAsTaggableOn::Tag.find_by(name: 'Comércio Parceiro da Produção Local')
    if tag
      tag.taggings.each do |tagging|
        partner = tagging.taggable
        partner.subcategory_list = partner.subcategory_list + ["Parceiro da Produção Local"]
        partner.save
      end
      tag.destroy
    end
  end
end
