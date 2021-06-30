require 'rails_helper'

describe FilterQuery, type: :model do
  describe '#query' do

    subject { FilterQuery.new(params).query }

    context "when searching by filter group" do
      let(:params) { {"upa"=>{"type"=>["upa"], "subcategory_list"=>["Agricultores com contato", "Aldeias Guarani"], "guarani_qualification_list"=>["Necessita agendamento prévio"]}} }

      it { is_expected.to include(expected_query) }
    end

    context "when searching by regular params" do
      let(:params) { {"upa"=>{"type"=>["upa"], "zone"=>["Zona Rural Norte"]}, "market"=>{"type"=>["market"]}, "tourism"=>{"type"=>["tourism"]}, "initiative"=>{"type"=>["initiative"]}} }

      it { is_expected.to include(regular_query) }
    end
  end
end

def expected_query
  { _or: [{ subcategory_list: ["Agricultores com contato"] },
          { subcategory_list: ["Aldeias Guarani"],
            qualification_list: ["Necessita agendamento prévio"] }
  ] }
end

def regular_query
  { _or: [{ type:  'upa', zone: ["Zona Rural Norte"] },
          { type: 'market' },
          { type: 'tourism' },
          { type: 'initiative' }] }
end
