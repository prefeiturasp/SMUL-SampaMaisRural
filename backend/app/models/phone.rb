class Phone < ApplicationRecord
  enum scope: %i[commercial registration home cellphone]
  belongs_to :partner
  validates :phone_number, presence: true

  def self.phone_params
    { phones_attributes: [:id, :kind, :scope, :phone_number, :_destroy]  }
  end
end
