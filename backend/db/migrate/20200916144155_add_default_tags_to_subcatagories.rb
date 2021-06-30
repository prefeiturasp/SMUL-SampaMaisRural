class AddDefaultTagsToSubcatagories < ActiveRecord::Migration[6.0]
  def change
    I18n.t('tags').each do |category, data|
      next unless data
      data.keys.each do |subcategory_key|
        sub_name = I18n.t('subcategories')[subcategory_key]
        subcategory = Subcategory.where("lower(name) = ?", sub_name.downcase).first
        next unless subcategory
        data[subcategory_key].each do |tag_list, values|
          tag_values = (subcategory.send(tag_list) + values).uniq
          subcategory.send("#{tag_list}=", tag_values)
        end
        subcategory.save
      end
    end
  end
end
