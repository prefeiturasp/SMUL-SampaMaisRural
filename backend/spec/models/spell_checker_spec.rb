require 'rails_helper'

RSpec.describe SpellChecker, type: :model do
  describe '#correct' do
    context "when value exists in dictionary" do
      before do
        YAML.stub(:load_file)
          .and_return({ incorrect_value.parameterize => correct_value })
      end
      let(:correct_value) { 'SP' }
      let(:incorrect_value) { 'São aulo' }

      context "when input is correct" do
        it { expect(subject.correct(correct_value)).to eq(correct_value) }
      end

      context "when input is incorrect" do
        it { expect(subject.correct(incorrect_value)).to eq(correct_value) }
      end
    end

    context "when value doesn't exists in dictionary" do
      let(:correct_value) { 'Something' }
      let(:incorrect_value) { 'SomThing' }

      context "when input is correct" do
        it { expect(subject.correct(correct_value)).to eq(correct_value) }
      end

      context "when input is incorrect" do
        it { expect(subject.correct(incorrect_value)).to eq(incorrect_value) }
      end
    end
  end
end
