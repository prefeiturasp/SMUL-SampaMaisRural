require 'rails_helper'

RSpec.describe Api::Partner, type: :model do
  describe '#address' do
    subject { described_class.new(partner).address }

    context 'when has main address' do
      let(:partner) { build_partner(address) }

      it  { is_expected.to eq address_expected }
    end

    context 'when has no main address' do
      let(:partner) { build_partner(registration_address) }
      it  { is_expected.to eq registration_address_expected }
    end
  end
end

def address
  { full_address: 'Rua do centro',
    district: 'Parelheiros',
    zone: 'Zona sul'}
end


def registration_address
  { full_address: 'Rua agricultor',
    district: 'Parelheiros',
    zone: 'Zona sul'}
end

def build_partner address
  FactoryBot.build(:partner, address)
end

def address_expected
  'Rua do centro, Parelheiros, Zona sul'
end

def registration_address_expected
  'Rua agricultor, Parelheiros, Zona sul'
end
