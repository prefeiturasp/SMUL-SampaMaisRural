class SetApiIdToPartners < ActiveRecord::Migration[6.0]
  def change
    Partner.find_each do |partner|
      partner.send(:save_api_id)
    end
  end
end
