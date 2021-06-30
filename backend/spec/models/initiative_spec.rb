require 'rails_helper'

RSpec.describe Initiative, type: :model do
  describe '.public_params' do
    subject { described_class.public_params }

    it { expect(subject).to include(:lat) }
    it { expect(subject).to include(:lon) }
    it { expect(subject).to include(:type) }
    it { expect(subject).to include(:kind) }
    it { expect(subject).to include(:sub_kind) }
    it { expect(subject).to include(:name) }
    it { expect(subject).to include(:qualifications) }
    it { expect(subject).to include(:full_address) }
    it { expect(subject).to include(:neighborhood) }
    it { expect(subject).to include(:city) }
    it { expect(subject).to include(:zip_code) }
    it { expect(subject).to include(:district) }
    it { expect(subject).to include(:schedule) }
    it { expect(subject).to include(:phone) }
    it { expect(subject).to include(:email) }
    it { expect(subject).to include(:site) }
    it { expect(subject).to include(:description) }
    it { expect(subject).to include(:associativism) }
    it { expect(subject).to include(:park) }
    it { expect(subject).to include(:disabled_friendly_amenities) }
    it { expect(subject).to include(:gender) }

    it { expect(subject).to_not include(:contact) }
    it { expect(subject).to_not include(:registration_name) }
    it { expect(subject).to_not include(:registration_phone) }
    it { expect(subject).to_not include(:responsable_name) }
    it { expect(subject).to_not include(:cpf) }
    it { expect(subject).to_not include(:other_information) }
  end

  describe '#public_params' do
    let(:initiative) { FactoryBot.build(:initiative) }
    subject { initiative.public_params }

    describe 'when is public' do
      before do
        initiative.public = true
      end

      it { expect(subject).to include(:full_address) }
    end

    describe 'when is not public' do
      before do
        initiative.public = false
      end

      it { expect(subject).to_not include(:full_address) }
    end

    it { expect(subject).to include(:name) }
    it { expect(subject).to include(:gender) }
    it { expect(subject).to include(:qualifications) }
    it { expect(subject).to include(:full_address) }
    it { expect(subject).to include(:neighborhood) }
    it { expect(subject).to include(:city) }
    it { expect(subject).to include(:zip_code) }
    it { expect(subject).to include(:district) }
    it { expect(subject).to include(:schedule) }
    it { expect(subject).to include(:phone) }
    it { expect(subject).to include(:email) }
    it { expect(subject).to include(:site) }
    it { expect(subject).to include(:description) }
    it { expect(subject).to include(:associativism) }
    it { expect(subject).to include(:park) }
    it { expect(subject).to include(:disabled_friendly_amenities) }

    context 'when is for download' do
      subject { initiative.public_params(described_class.restricted_download_params) }
      it { expect(subject).to_not include(:lat) }
      it { expect(subject).to_not include(:lon) }
    end
  end
end
