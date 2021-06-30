require 'rails_helper'

RSpec.describe PartnerReport, type: :model do
  describe "#count" do
    let(:partners) { [] }
    before do
      3.times do
        partners << FactoryBot.create(:upa)
      end
    end

    subject { described_class.new(partners).count }

    it { is_expected.to eq(3) }
  end
end
