class AddTagsToSubcategories < ActiveRecord::Migration[6.0]
  def change
    Partner.not_api.find_each do |partner|
      partner.subcategories.each do |subcategory|
        partner.type.constantize.tag_list.each do |tag_list|
          list_name = "#{tag_list.to_s.singularize}_list"
          current_subcategories = (subcategory.send(list_name) + partner.send(list_name)).uniq
          subcategory.send("#{list_name}=", current_subcategories)
          subcategory.save
        end
      end
    end
  end
end
