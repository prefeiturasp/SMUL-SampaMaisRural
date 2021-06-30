require 'rails_helper'

describe AreaSerializer, type: :model do
  describe '.serialize' do
    context "when area is zero" do
      subject { described_class.serialize('0') }

      it { is_expected.to be_nil }
    end

    context "when area is lower than 0,1 ha" do
      subject { described_class.serialize('0,09') }

      it { is_expected.to eq("Até 0,1 ha") }
    end

    context "area is equal 0,1 ha" do
      subject { described_class.serialize('0,1') }

      it { is_expected.to eq("0,1 a 5 ha") }
    end

    context "area is greater than 0,1 and lower than 5ha" do
      subject { described_class.serialize('0,2') }

      it { is_expected.to eq("0,1 a 5 ha") }
    end

    context "when is area equal than 5ha" do
      subject { described_class.serialize('5') }

      it { is_expected.to eq("0,1 a 5 ha") }
    end

    context "when is cultivated_area is greater than 5 ha" do
      subject { described_class.serialize('6') }

      it { is_expected.to eq("Mais de 5 ha") }
    end
  end
end
