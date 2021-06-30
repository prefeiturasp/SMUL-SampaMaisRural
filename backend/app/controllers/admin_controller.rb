# frozen_string_literal: true
class AdminController < ApplicationController
  before_action :authenticate_user!

  def searchable_partners
    records = Partner.approved.ransack(params[:q]).result
    render json: records.as_json(only: [:id, :name])
  end
end
