require 'rails_helper'
require './lib/etl/common/transform_default_value.rb'

describe TransformDefaultValue, type: :model do

  describe '#process' do

    VALUES = {
     '1' => "Feminino",
     '2' => "Masculino",
     '3' => "Outro",
     '4' => "Prefiro não dizer"
    }

    subject { described_class.new(values: VALUES, field: :gender)
      .process({ gender: value }) }

    context "when is nil" do
      let(:value) { nil }
      it { is_expected.to eq({ gender: nil }) }
    end
    context "when is 1" do
      let(:value) { 1 }
      it { is_expected.to eq({ gender: "Feminino" }) }
    end

    context  "when is 2" do
      let(:value) { 2 }
      it { is_expected.to eq({ gender: "Masculino" }) }
    end

    context  "when is 2 as string" do
      let(:value) { '2' }
      it { is_expected.to eq({ gender: "Masculino" }) }
    end

    context "when is 3" do
      let(:value) { 3 }
      it { is_expected.to eq({ gender: "Outro" }) }
    end

    context "when is 4" do
      let(:value) { 4 }
      it { is_expected.to eq({ gender: "Prefiro não dizer" }) }
    end

    context "when is unknow value" do
      let(:value) { "unknow" }
      it { is_expected.to eq({ gender: "unknow" }) }
    end
  end
end


