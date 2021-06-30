require 'rails_helper'

RSpec.describe "Api::Messages", type: :request do
  describe "POST create" do
    let(:path) { '/api/resources/message' }

    before do
      post path, params: { message: params }
    end

    context "when is a valid message" do
      let(:params) { {
        name: 'Sérgio Reis',
        email: 'sergio@reis.net',
        phone: '(12) 3456-78910',
        message: 'Achei muito interessante a iniciativa.'
      } }

      it "creates a message" do
        expect(Message.count).to eq(1)
      end

      it "returns created status" do
        expect(response).to have_http_status(:created)
      end
    end

    context "when is a invalid message" do
      let(:params) { {
        name: 'Sérgio Reis',
        email: 'sergio@reis.net',
        phone: '(12) 3456-78910'
      } }

      it "doesn't create a message" do
        expect(Message.count).to eq(0)
      end

      it "returns unprocessable_entity status" do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
