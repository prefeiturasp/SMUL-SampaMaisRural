class TagsToQualifications < ActiveRecord::Migration[6.0]
  def change
    Market.geosampa.find_each do |market|
      market.qualification_list = market.tag_list
      market.tag_list = []
      market.save
    end
  end
end
