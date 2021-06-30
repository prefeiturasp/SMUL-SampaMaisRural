require 'rails_helper'

RSpec.describe DataReport, type: :model do
  describe '.all' do
    it "return array of data report instances" do
      described_class.all.each do |report|
        expect(report).to be_instance_of(described_class)
      end
    end
  end
end
