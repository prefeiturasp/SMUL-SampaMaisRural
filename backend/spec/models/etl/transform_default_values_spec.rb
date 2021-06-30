require 'rails_helper'
require './lib/etl/common/transform_default_values.rb'

describe TransformDefaultValues, type: :model do

  describe '#process' do

    VALUES = {
     '0' => "Não comercializa",
     '1' => "Intermediário",
     '11' => "Intermediário",
     '3' => "Venda local",
     '8' => "Venda local",
     '9' => "Mercado institucional",
     '10' => "Mercado institucional",
     '2' => "CEAGESP e grandes redes",
     '4' => "CEAGESP e grandes redes",
     '12' => "Feiras livres",
     '5' => "Restaurantes e entregas",
     '6' => "Restaurantes e entregas",
     '7' => "Restaurantes e entregas",
     '13' => "Restaurantes e entregas"
    }

    subject { described_class.new(values: VALUES, field: :where_find_list)
      .process({ where_find_list: value }) }

    context "when is nil" do
      let(:value) { nil }
      it { is_expected.to eq({ where_find_list: nil }) }
    end

    context "when is empty list" do
      let(:value) { [] }
      it { is_expected.to eq({ where_find_list: [] }) }
    end

    context "when is not a list" do
      let(:value) { '0' }
      it { is_expected.to eq({ where_find_list: "Não comercializa" }) }
    end

    context "when has only know values" do
      let(:value) { [0, '1', 3] }
      it { is_expected.to eq({ where_find_list: ["Não comercializa", "Intermediário", "Venda local"] }) }
    end

    context "when has only unknow values" do
      let(:value) { ["foo", "bar"] }
      it { is_expected.to eq({ where_find_list: value }) }
    end

    context  "when has know and unknow values" do
      let(:value) { [12, 5, "foo", "bar"] }
      it { is_expected.to eq({ where_find_list: ["Feiras livres", "Restaurantes e entregas", "foo", "bar"] }) }
    end
  end
end


