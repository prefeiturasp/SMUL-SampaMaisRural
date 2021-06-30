require 'rails_helper'

describe Api::Upa, type: :model do
  let(:partner) { FactoryBot.build(:partner) }

  subject { described_class.new(partner) }
  describe "#cultivated_area_range" do
    context "when partner is not a farmer" do
      before do
        subject.stub(:farmer?).and_return(false)
      end

      it { expect(subject.cultivated_area).to be_nil }
    end

    context "when partner is a farmer" do
      before do
        subject.stub(:farmer?).and_return(true)
      end

      context "and has not cultivated_area"  do
        it { expect(subject.cultivated_area).to be_nil }
      end


      context "and has cultivated_area"  do
        before do
          subject.stub(:cultivated_area).and_return('0,1')
        end

        it "serializes cultivated_area" do
          expect(AreaSerializer).to receive(:serialize).with(subject.cultivated_area)
          subject.cultivated_area_range
        end
      end
    end
  end
end
