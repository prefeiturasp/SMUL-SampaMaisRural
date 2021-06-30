class Api::DataController < ApplicationController

  def index
    @partners = Partner.approved.where(data_params)
  end

  def file
    @attachment = Attachment.report.where(data_params).last
    send_file @attachment.file.path
  end

  def regions
    render json: File.read("public/#{ params[:region].to_s }.json")
  end

  def covid
    render json: Partner.covid_report.data
  end

  def all
    @partner_klass = params[:type].camelcase.constantize
    render json:  @partner_klass.public_report.data
  end

  private
  def data_params
    params.permit(:source)
  end
end
