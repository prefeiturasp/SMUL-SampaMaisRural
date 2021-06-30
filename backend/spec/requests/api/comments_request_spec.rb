require 'rails_helper'

RSpec.describe "Comments", type: :request do
  let(:partner) { FactoryBot.create(:upa) }

  describe 'GET index' do
    let(:path) { "/api/partners/#{ partner.id }/comments" }
    let!(:pending_comment) { FactoryBot.create(:comment, partner: partner) }
    let!(:approved_comment) { FactoryBot.create(:comment,
                                                partner: partner,
                                                status: :approved) }
    before do
      get path
    end

    it "assigns approved @comments" do
      expect(assigns(:comments)).to include(approved_comment)
    end

    it "doesn't assign pending @comments" do
      expect(assigns(:comments)).to_not include(pending_comment)
    end

    it "renders the index template" do
      expect(response).to render_template("index")
    end
  end

  describe 'POST create' do
    let(:path) { "/api/resources/comment" }

    let(:params) {{
      name: 'Fulano',
      email: 'fulano@teste.com',
      data: 'Muito legal o lugar',
      partner_id:  partner.id
    }}

    subject { post path, params: { comment: params } }

    context 'valid request' do
      it 'returns status created' do
        subject
        expect(response).to have_http_status :created
      end

      it 'associate comment to partner' do
        expect { subject }.to change { partner.comments.count }.from(0).to(1)
      end

      it 'creates comment' do
        expect { subject }.to change { Comment.count }.from(0).to(1)
      end
    end

    context 'invalid request' do
      before do
        params.delete(:name)
      end

      it 'returns status unprocessable_entity' do
        subject
        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end
end
