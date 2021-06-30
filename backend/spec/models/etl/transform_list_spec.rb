require 'rails_helper'
require './lib/etl/common/transform_list.rb'

describe TransformList, type: :model do
  describe '#process' do
    let(:field) { :test_field }
    subject { described_class.new(field).process value }

    context "when receives nil" do
      let(:value) { { field => nil } }

      it { is_expected.to eq({ field => [] }) }
    end

    context "when receives simple string" do
      let(:value) { { field => "1" } }

      it { is_expected.to eq({ field => ['1'] }) }
    end

    context "when receives number " do
      let(:value) { { field => 1 } }

      it { is_expected.to eq({ field => ['1'] }) }
    end

    context "when receives an array" do
      let(:value) { { field => ["1"] } }

      it { is_expected.to eq(value) }
    end

    context "when receives string comma separated" do
      let(:value) { { field => "1,2,3" } }

      it { is_expected.to eq({ field => ["1", "2", "3"] }) }
    end

    context "when receives string semcolons separated" do
      let(:value) { { field => "1;2;3" } }

      it { is_expected.to eq({ field => ["1", "2", "3"] }) }
    end

    context "when receives string semcolons separated and space between" do
      let(:value) { { field => "1; 2; 3" } }

      it { is_expected.to eq({ field => ["1", "2", "3"] }) }
    end
  end
end
