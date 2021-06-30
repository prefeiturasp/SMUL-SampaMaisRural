require 'rails_helper'

RSpec.describe Suggestion, type: :model do
  describe 'validations'  do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should_not validate_presence_of(:phone) }

    context "when has attachments" do
      let(:attachments) { [FactoryBot.build(:attachment)] }

      before do
        subject.stub(:attachments).and_return(attachments)
      end

      it { should_not validate_presence_of(:message) }
    end

    context "when hasn't attachments" do
      it { should validate_presence_of(:message) }
    end
  end
end
