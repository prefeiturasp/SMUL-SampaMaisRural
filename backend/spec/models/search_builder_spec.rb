require 'rails_helper'

RSpec.describe SearchBuilder, type: :model do

  describe '#query_params' do

    let(:es_search) {
      HashWithIndifferentAccess
        .new({
        type: ["market"],
        covid: true
      })
    }

    let(:covid_params) {
      HashWithIndifferentAccess
        .new({"covid"=>"true",
              "page"=>"1",
              "type"=>["market"],
              "center_lat"=>"-23.66135103533398",
              "center_lon"=>"-46.69532775878907",
              "upa"=>{"source"=>["upa"]}}
            ) }
    subject { described_class.new(covid_params) }

    it { expect(subject.query_params[:covid]).to eq(true.to_s) }
  end

end
