require 'rails_helper'

RSpec.describe "Api::Suggestions", type: :request do
  describe 'POST create' do
    let(:path) { '/api/resources/suggestion' }
    let(:partner) { FactoryBot.create(:upa) }
    let(:attachments) { [
      { file: fixture_file_upload('attachment.jpg') },
      { file: fixture_file_upload('attachment.jpg') },
      { file: fixture_file_upload('attachment.jpg') }
    ]}

    context 'valid request' do
      let(:params) { {
        name: 'João da Silva',
        phone: '(11) 99090-09090',
        email: 'fulano@teste.com',
        message: 'O Telefone mudou',
        suggestable_id: partner.id,
        attachments_attributes: attachments
      }}

      subject { post path, params: { suggestion: params } }

      it 'returns status created' do
        subject
        expect(response).to have_http_status :created
      end

      it 'creates suggestion' do
        expect { subject }.to change { Suggestion.count }.from(0).to(1)
      end

      it 'creates attachments' do
        expect { subject }.to change { Attachment.count }.from(0).to(attachments.count)
      end
    end
  end
end
