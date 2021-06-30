require 'rails_helper'

RSpec.describe Market, type: :model do
  describe '.filterable_attributes' do
    subject { described_class.filterable_attributes }

    it { is_expected.to include(:kind) }
  end

  describe '.api_attributes' do
    subject { described_class.api_attributes }

    it { is_expected.to include(:kind) }
    it { is_expected.to include(:name) }
    it { is_expected.to include(:full_address) }
    it { is_expected.to include(:neighborhood) }
    it { is_expected.to include(:district) }
    it { is_expected.to include(:city) }
    it { is_expected.to include(:state) }
    it { is_expected.to include(:zip_code) }
    it { is_expected.to include(:phone) }
    it { is_expected.to include(:site) }
    it { is_expected.to include(:schedule) }
    it { is_expected.to_not include(:references) }
  end
end
