require 'rails_helper'

RSpec.describe Seal, type: :model do
  let(:file) { file_fixture("attachment.jpg").read }
  let(:partner) { FactoryBot.create(:upa) }
  let(:seal) { FactoryBot.create(:seal, file: file, qr_code: file, shareable: partner) }

  describe '#files' do
    subject { seal.files }

    it { is_expected.to include(seal.file.url) }
    it { is_expected.to include(seal.qr_code.url) }
  end
end
