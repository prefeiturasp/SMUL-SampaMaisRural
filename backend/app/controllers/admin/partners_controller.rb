# frozen_string_literal: true

class Admin::PartnersController < AdminController
  def index
    @resource_klass  = query_params[:type].camelcase.constantize
    records = @resource_klass.includes(:related_partners, taggings: :tag).where(query_params[:q])
    respond_to do |format|
      format.csv { send_data records.to_csv, filename: "#{@resource_klass.model_name.human.downcase}-#{Date.today}.csv" }
    end
  end

  def connections
    @partner = Partner.find params[:partner_id]
    render json: @partner.partners.group(:id).as_json(only: [:id, :name])
  end

  private

  def query_params
    params.permit(:type, q: [:source, taggings: { tags: [:name] }])
  end
end
