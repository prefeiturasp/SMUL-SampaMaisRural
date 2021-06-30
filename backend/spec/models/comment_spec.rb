require 'rails_helper'

RSpec.describe Comment, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:data) }
  it { should validate_presence_of(:partner_id) }
end
