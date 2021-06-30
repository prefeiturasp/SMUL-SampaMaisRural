class Api::DataReportsController < ApplicationController
  before_action :load_reports

  def index
    render json: Download::SourceBase.to_json(@reports)
  end

  def show
    @report = @reports.select {|report| report.slug == params[:id]}[0]
    respond_to do |format|
      format.json
      format.csv { send_data @report.to_csv, filename: "#{@report.name}.csv" }
    end
  end

  private

  def load_reports
    @reports = Download::SourceBase.all
  end
end
