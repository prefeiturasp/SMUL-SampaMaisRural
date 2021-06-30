require 'rails_helper'

describe WebPageFormatter, type: :model do
  describe '.call' do
    context 'when receives an url with http' do
      let(:url) { 'http://foo.bar' }

      subject { described_class.call(url) }

      it { is_expected.to eq(url) }
    end

    context 'when receives an url with https' do
      let(:url) { 'https://foo.bar' }
      subject { described_class.call(url) }

      it { is_expected.to eq(url) }
    end

    context 'when receives an url without http or https' do
      let(:url) { 'foo.bar' }
      subject { described_class.call(url) }

      it { is_expected.to eq('http://' + url) }
    end

    context 'when receives blank value' do
      let(:url) { '' }
      subject { described_class.call(url) }

      it { is_expected.to eq(nil) }
    end

    context 'when receives nil value' do
      let(:url) { nil }
      subject { described_class.call(url) }

      it { is_expected.to eq(url) }
    end
  end
end
