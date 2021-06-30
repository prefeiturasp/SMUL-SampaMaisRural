require 'rails_helper'

RSpec.describe "Api::Partners", type: :request do
  describe 'POST create' do
    let(:phones) {
      { commercial: ['(11) 90000-0000', ' (11) 92222-2222'],
        registration: ['(11) 90000-0000', ' (11) 92222-2223'],
        cellphone: ['(11) 90000-0000', ' (11) 92222-2224'],
        other: ['(11) 90000-0000', ' (11) 92222-2225'] }
    }
    let(:avatar) { fixture_file_upload('avatar.jpg') }
    let(:attachments) { [
      { file: fixture_file_upload('attachment.jpg') },
      { file: fixture_file_upload('attachment.jpg') },
      { file: fixture_file_upload('attachment.jpg') }
    ]}
    let(:name) { 'Parceiro Sampa Rural' }
    let(:full_address) { 'Praça da Sé' }
    let(:lat) { -23.5499158 }
    let(:lon) { -46.6334289 }
    let(:job_role) { 'Responsável pelo local' }
    let(:schedule) { 'Seg à Sex' }
    let(:description) { 'Simple description' }
    let(:email) { 'partner@test.com' }
    let(:site) { 'https://partner.com.br' }
    let(:products_list) { ['Frutas', 'Legumes', 'Grãos'] }

    let(:partner_params) { {
      name: name,
      full_address: full_address,
      products_list: products_list,
      _lat: lat,
      _lon: lon,
      schedule: schedule,
      birthdate: "01/01/1930",
      job_role: job_role,
      avatar: avatar,
      publish_address: true,
      description: description,
      commercial_phone_list: phones[:commercial].join(','),
      attachments_attributes: attachments,
      registration_name: 'João de SP',
    } }

    before do
      phones.keys.each do |phone_kind|
        partner_params.merge!({ phone_kind.to_s + '_phone_list' => phones[phone_kind].join(', ') })
      end
    end


    context 'valid request' do

      context 'creating UPA' do
        let(:path) { '/api/resources/upa' }

        let(:where_find) { ['Feiras', 'Restaurantes'] }
        let(:certificates) { [
          'Protocolo de Transição Agroecológica',
          'Orgânico por Auditoria, IBD'
        ] }
        let(:params) { partner_params.merge({
          gender: 'Outro',
          where_find: where_find,
          family_work: true,
          cultivated_area: '1 hec',
          certificates: certificates,
          publish_address: true,
          fruit_species: 'Exóticas',
          references: 'Pequenos Mercados',
        }) }

        subject { post path, params: { upa: params } }

        it 'returns status created' do
          subject
          expect(response).to have_http_status :created
        end

        it 'creates upa' do
          expect { subject }.to change { Upa.count }.from(0).to(1)
        end

        it 'creates attachments' do
          expect { subject }.to change { Attachment.count }.from(0).to(attachments.count)
        end
      end

      context 'creating Tourism' do
        let(:path) { '/api/resources/tourism' }

        let(:subcategory_list) { 'Horta Urbana' }
        let(:activity_list) { 'atividade 1, atividade 2' }
        let(:tags_list) { ['Necessita Agendamento'] }
        let(:params) { partner_params.merge!({ tags_list: tags_list, activity_list: activity_list, subcategory_list: subcategory_list }) }

        subject { post path, params: { tourism: params } }

        it 'returns status created' do
          subject
          expect(response).to have_http_status :created
        end

        it 'creates upa' do
          expect { subject }.to change { Tourism.count }.from(0).to(1)
        end

        it 'creates attachments' do
          expect { subject }.to change { Attachment.count }.from(0).to(attachments.count)
        end
      end

      context 'creating Market' do
        let(:path) { '/api/resources/market' }

        let(:subcategory_list) { ['Horta Urbana', 'Agrofloresta', 'Estufa'] }
        let(:tags_list) { ['Possui estacionamento'] }
        let(:params) { partner_params.merge!({ tags_list: tags_list }) }

        subject { post path, params: { market: params } }

        it 'returns status created' do
          subject
          expect(response).to have_http_status :created
        end

        it 'creates upa' do
          expect { subject }.to change { Market.count }.from(0).to(1)
        end

        it 'creates attachments' do
          expect { subject }.to change { Attachment.count }.from(0).to(attachments.count)
        end
      end

      context 'creating initiative' do
        let(:path) { '/api/resources/initiative' }

        let(:subcategory_list) { ['Políticas Públicas'] }
        let(:tags_list) { ['Possui estacionamento'] }
        let(:params) { partner_params.merge!({ tags_list: tags_list }) }

        subject { post path, params: { initiative: params } }

        it 'returns status created' do
          subject
          expect(response).to have_http_status :created
        end

        it 'creates upa' do
          expect { subject }.to change { Initiative.count }.from(0).to(1)
        end

        it 'creates attachments' do
          expect { subject }.to change { Attachment.count }.from(0).to(attachments.count)
        end
      end
    end


    context 'invalid request' do
      let(:path) { '/api/resources/upa' }
      let(:invalid_params) { { name: 'Invalid Partner' } }

      subject { post path, params: { upa: invalid_params } }

      it 'returns status unprocessable_entity' do
        subject
        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end

  describe 'GET show' do
    let!(:partner) { FactoryBot.create(:upa) }
    let(:path) { '/api/partners/' + partner.slug }

    before do
      get path
    end

    it "assigns @partner" do
      expect(assigns(:partner)).to eq(partner)
    end

    it "renders the show template" do
      expect(response).to render_template("show")
    end
  end

  describe 'GET index' do
    let(:lat) { -23.5499158 }
    let(:lon) { -46.6334289 }
    let(:center) { lon.to_s + ' ' + lat.to_s }
    let(:path) { '/api/partners?' }

    before do
      formatted_path = path + '&center=' + center
      get formatted_path
    end

    context 'without type' do
      let!(:partner) { FactoryBot.create(:upa) }

      context "without passing type" do
        it "assigns @partners" do
          expect(assigns(:partners)).to include(partner)
        end

        it "renders the index template" do
          expect(response).to render_template("index")
        end
      end
    end

    context "passing type" do
      let!(:upa) { FactoryBot.create(:upa) }
      let!(:market) { FactoryBot.create(:market) }
      #let!(:tourism) { FactoryBot.create(:tourism) }

      context 'when is upa' do
        let(:path) { '/api/partners?type=upa' }

        it { expect(assigns(:partners)).to include(upa) }
        it { expect(assigns(:partners)).to_not include(market) }
        xit { expect(assigns(:partners)).to_not include(tourism) }
      end

      context "when is market" do
        let(:path) { '/api/partners?type=market' }

        it { expect(assigns(:partners)).to_not include(upa) }
        it { expect(assigns(:partners)).to include(market) }
        xit { expect(assigns(:partners)).to_not include(tourism) }
      end

      context "when is tourism" do
        let(:path) { '/api/partners?type=tourism' }

        it { expect(assigns(:partners)).to_not include(upa) }
        it { expect(assigns(:partners)).to_not include(market) }
        xit { expect(assigns(:partners)).to include(tourism) }
      end
    end
  end
end
