class MigrateRelatedPartners < ActiveRecord::Migration[6.0]
  def change
    Partner.joins(:related_partners).group(:id).each do |partner|
      partner.related_partners.each do |related_partner|
        if partner.partners.pluck(:id).exclude?(related_partner.id)
          Connection.create(partners: [partner, related_partner])
        end
      end
    end
  end
end
