require 'rails_helper'

RSpec.describe CreateFilterGroupService, type: :model do
  let(:partner) { FactoryBot.build(:upa, :with_contact) }

  describe '#create_group' do
    subject { described_class.new(partner).create_groups }
    it "creates a filter  group" do

      expect { subject }.to change { FilterGroup.count }.from(0).to(1)
      expect { subject }.to change { Filter.count }.from(0).to(1)
    end
  end
end
