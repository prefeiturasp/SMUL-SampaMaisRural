class NormalizeTag < ActiveRecord::Migration[6.0]
  def change
    ActsAsTaggableOn::Tag.where(name: "plantas ornamentais").each do |tag|
      new_tag = ActsAsTaggableOn::Tag.find_by(name: '5')
      tag.taggings.each do |tagging|
        partner = tagging.taggable
        partner.subcategory_list = partner.subcategory_list + new_tag.name
      end
      tag.destroy
    end
  end
end
