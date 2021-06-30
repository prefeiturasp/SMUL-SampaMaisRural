class GenerateSlugs < ActiveRecord::Migration[6.0]
  def change
    Partner.find_each do |partner|
      partner.save
    end
  end
end
