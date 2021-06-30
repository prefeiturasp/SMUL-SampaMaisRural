require 'rails_helper'

describe AttachmentMetadata, type: :model do
  describe '#author' do
    context 'without author name' do
      subject { described_class.new('001.png').author }

      it { is_expected.to be_nil }
    end

    context 'without author name' do
      subject { described_class.new('test.png').author }

      it { is_expected.to be_nil }
    end

    context 'without author name separated by -' do
      subject { described_class.new('001 - John Doe.png').author }

      it { is_expected.to eq('John Doe') }
    end
  end

  describe '#position' do
    context 'without position' do
      subject { described_class.new('test.png').position }

      it { is_expected.to be_nil }
    end

    context 'with position' do
      context 'only position' do
        subject { described_class.new('002.png').position }

        it { is_expected.to eq(2) }
      end

      context 'author and position' do
        subject { described_class.new('003 - John Doe.png').position }

        it { is_expected.to eq(3) }
      end
    end
  end
end
