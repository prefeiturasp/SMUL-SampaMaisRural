require 'rails_helper'

RSpec.describe Partner, type: :model do

  describe 'associations' do
    describe 'callbacks' do
      describe '#related_partners' do
        let!(:p1) { FactoryBot.create(:upa) }
        let!(:p2) { FactoryBot.create(:market) }

        context  'adding related partner' do
          before do
            p1.related_partner_ids = [p2.id]
          end

          context 'p1 related with p2'  do
            it { expect(p1.related_partners).to include(p2) }
          end

          context 'p2 related with p1' do
            it { expect(p2.related_partners).to include(p1) }
          end
        end

        describe 'removing related partner' do
          before do
            p1.related_partner_ids = []
          end

          context 'p1 related with p2'  do
            it { expect(p1.related_partners).to_not include(p2) }
          end

          context 'p2 related with p1' do
            it { expect(p2.related_partners).to_not include(p1) }
          end
        end
      end
    end
  end

  describe '.api_attributes' do
    subject { described_class.api_attributes }

    it { is_expected.to include(:id) }
    it { is_expected.to include(:slug) }
    it { is_expected.to include(:name) }
    it { is_expected.to include(:type) }
    it { is_expected.to include(:products) }
    it { is_expected.to include(:kind) }
    it { is_expected.to include(:avatar_url) }
    it { is_expected.to include(:schedule) }
    it { is_expected.to include(:full_address) }
    it { is_expected.to include(:neighborhood) }
    it { is_expected.to include(:public) }
    it { is_expected.to include(:city) }
    it { is_expected.to include(:zip_code) }
    it { is_expected.to include(:lat) }
    it { is_expected.to include(:lon) }
    it { is_expected.to include(:state) }
    it { is_expected.to include(:images) }
    it { is_expected.to include(:status) }
    it { is_expected.to include(:source) }
    it { is_expected.to include(:updated_at) }
  end

  describe '.regular_params' do
    let(:regular_params) {
      %i[
      avatar
      name
      email
      web_pages
      farms_count
      associativism
      park
      disabled_friendly_amenities
      source
      zone
      contact
      schedule
      type
      description]
    }
    let(:registration_params) {
      %i[
      neighborhood_region
      begined_at
      registration_name
      cpf
      registration_email
      registration_phone_list
      responsable_for_register
      api_name
      other_information
      cnpj
      company_activity
      other_contact
      api_id
      ]
    }
    let(:address_params) {
      %i[
      full_address
      _lat
      _lon
      neighborhood
      zip_code
      district
      city
      ]
    }

    let(:all_params) { regular_params + registration_params + address_params }

    subject { described_class.creation_params }

    it "returns regular params" do
      all_params.each do |param|
        expect(subject).to include(param)
      end
    end
  end

  describe '.personal_params' do

  end

  describe '.address_params' do

  end

  describe '.creation_params' do
    subject { described_class.creation_params }

    # TODO implement DRY


 ## context 'lists' do
 ##   let!(:list_params) { %i[
 ##                        attachments_attributes
 ##                        products_lis
 ##                        subcategories_list
 ##                        tags_list
 ##                        activities_list
 ##                        where_find
 ##                        phones_list
 ##                        other_phones
 ##                        cellphones
 ##                        registration_phones
 ##                        ]
 ##   }

 ##   its(list_params) { is_expected.to eq [] }
  # end
  end

  describe 'callbacks' do
    subject { FactoryBot.create(:upa) }

    it { expect(subject.lonlat).to_not be_nil }
  end

  describe 'validations'  do
    it { should validate_presence_of(:name) }

    context 'when partner has status approved' do
      context "when partner hasn't location" do
        subject { build(:partner, status: :approved) }

        it { should validate_presence_of(:_lat) }
        it { should validate_presence_of(:_lon) }
      end
    end
  end
end
