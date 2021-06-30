class GenerateSealToPartners < ActiveRecord::Migration[6.0]
  def change
    Partner.find_each do |partner|
      partner.generate_seal
      partner.save
    end
  end
end
