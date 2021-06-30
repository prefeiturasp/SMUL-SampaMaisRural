class RelatedPartner < ApplicationRecord
  belongs_to :partner, class_name: 'Partner'
  belongs_to :related_partner, class_name: 'Partner'
end
