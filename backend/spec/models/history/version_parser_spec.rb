require 'rails_helper'

RSpec.describe History::VersionParser, type: :model do
  let(:changeset) {
    {"data"=>[{"responsable_name"=>"Vinicius de Souza Almeida - Responsável do IBECO", "registration_email"=>"vin.almeida@outlook.com", "registered_by"=>"André Biazoti"}, {"responsable_name"=>"Vinicius de Souza Almeida - Responsável do IBECO", "registration_email"=>"emailvin.almeida@outlook.com", "registered_by"=>"André Biazoti", "begined_at"=>"", "cpf"=>"", "gender"=>"", "contact"=>"", "api_name"=>"", "other_information"=>"", "cnpj"=>"", "company_activity"=>"", "other_contact"=>"", "cnae"=>"", "registration_neighborhood"=>"", "registration_address"=>"", "registration_zip_code"=>""}], "name"=>["Instituto Biguá - Eco Estudantil", "Instituto Biguá - Eco Estudantil mudou"], "updated_at"=>[Date.yesterday, Date.today], "references"=>[nil, ""], "cultivated_area"=>[nil, ""], "source_link"=>[nil, ""]}
  }
  subject { described_class.new(changeset) }

  describe '#changed_fields' do
    it "returns array of changed fields" do
      expect(subject.changed_fields).to include('name')
      expect(subject.changed_fields).to include('registration_email')
      expect(subject.changed_fields).to_not include('responsable_name')
      expect(subject.changed_fields).to_not include('registered_by')
      expect(subject.changed_fields).to_not include('updated_at')
      expect(subject.changed_fields).to_not include('data')
    end
  end
end
