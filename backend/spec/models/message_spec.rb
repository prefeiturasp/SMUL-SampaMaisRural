require 'rails_helper'

RSpec.describe Message, type: :model do

  describe ".all_params" do
    subject { Message.all_params }
    it { is_expected.to include(:name) }
    it { is_expected.to include(:email) }
    it { is_expected.to include(:phone) }
    it { is_expected.to include(:message) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:phone) }
    it { should validate_presence_of(:message) }
  end

end
