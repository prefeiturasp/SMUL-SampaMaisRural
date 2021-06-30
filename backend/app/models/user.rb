class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true

  extend Enumerize
  enumerize :roles, in: [:admin, :tourism, :upa, :initiative, :market, :agriculture, :integrated_market, :rural_experience],
  multiple: true

  scope :with_role, ->(role) { where(":role = ANY(roles)", role: role) }

  def has_role? role
    roles.include? role.to_s.downcase
  end
end
