require 'rails_helper'

describe Metadata::Process do
  let(:config) { Metadata::SEAL[:title] }
  subject { described_class.new(config, "foo") }

  describe "#initialize" do
    it "formats draw" do
      expect(subject.config.draw).to eq("text 10, 10 'foo'")
    end
  end

  describe "#call" do
    let(:cmd) { double("cmd") }

    it "proccess command" do
      config.each_key do |property|
        expect(cmd).to receive(property).with(subject.config.public_send(property))
      end
      subject.call cmd
    end
  end
end
