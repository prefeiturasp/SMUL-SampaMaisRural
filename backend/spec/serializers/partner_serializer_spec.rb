require 'rails_helper'

describe PartnerSerializer, type: :model do

  subject { described_class.new(partner).call }

  describe ".call" do
    context 'farmer' do
      let(:partner) { FactoryBot.create(:upa) }
      it { expect(subject.class).to eq(Hash) }
    end

    context 'market' do
      let(:partner) { FactoryBot.create(:market) }
      it { expect(subject.class).to eq(Hash) }
    end

    context 'rural_experience' do
      let(:partner) { FactoryBot.create(:tourism, :rural_experience) }
      it { expect(subject.class).to eq(Hash) }
    end

    context 'tourism' do
      let(:partner) { FactoryBot.create(:tourism) }
      it { expect(subject.class).to eq(Hash) }
    end

    context 'initiative' do
      let(:partner) { FactoryBot.create(:initiative) }
      it { expect(subject.class).to eq(Hash) }
    end
  end

  describe 'read' do
    let(:farmer) { farmer_data }
    let(:template) { I18n.t('templates.upa') }

    subject { described_class.new.read(farmer_data) }

    context 'padding farmer template' do
      it 'returns a serialized farmer' do
        template.each do |attr, label|
          expect(subject[attr]).to eq(farmer[label])
        end
      end
    end
  end
end

def farmer_data
  {:id=>"ABC",
   :status=>"Pendente",
   :categoria=>"Agricultura",
   :subcategorias=>"Hortas urbanas",
   :nome_no_perfil=>"Horta Capivari",
   :qualificaes=> "Qualification 1; Qualification 2",
   :atividade_de_conexo=>  "Activity 1; Actiivity 2",
   :onde_comprar=> "Supermarket",
   :cep=>"00000-000",
   :distrito=> "Some District",
   :cidade=> "Some City",
   :zona=>"Zona Urbana",
   :endereo=> "Some street",
   :bairro=>"Some neighborhood",
   :telefone_comercial_1=> "00000-0000",
   :telefone_comercial_1_tipo=> "Commercial 1",
   :telefone_comercial_2=> "1111-1111",
   :telefone_comercial_2_tipo=> "Comercial 2",
   :telefone_comercial_3=> "2222-2222",
   :telefone_comercial_3_tipo=> "Comercial 3",
   :dias_e_horrio_de_funcionamento=> "Sundays",
   :email=> "foo@bar.com",
   :siteblogsredes_sociais=> "website.com",
   :contato=> "email@bar.com",
   :outra_forma_de_contato=> "(11) 00000",
   :descrio=> "Some description",
   :nmero_de_roas=> 3,
   :associativismo=> "Cooperative",
   :estacionamento=> "Sim",
   :possui_facilidades_para_pessoas_com_necessidades_especiais=>"Não",
   :polo_de_ecoturismo=> "Some place",
   :gnero_da_responsvel=> "Feminino",
   :ano_de_incio_da_atividade=> "2015",
   :nome_da_base_de_dados=>"sprural",
   :data_da_coleta=>"2020",
   :fonte=> "Mapa Hortas Urbanas do ABC (https://tinyurl.com/mapahortasabc), por Quintal Itinerante (https://www.facebook.com/quintalitinerante/)",
   :fonte_2=> "Other Source",
   :data_da_ltima_atualizao=> Date.today,
   :nome_da_unidade_produtiva=> "Farmers",
   :cpf=> "917.180.840-05",
   :telefone_residencial=> "2222-2222",
   :telefone_celular=> "3333-33333",
   :cnpj=>nil,
   :cnae=>nil,
   :atividade_econmica=>nil,
   :responsvel_pela_acoleta=>"Jhon",
   :latitudade=>"-23.6453309",
   :longitude=>"-46.5700974"}
end
