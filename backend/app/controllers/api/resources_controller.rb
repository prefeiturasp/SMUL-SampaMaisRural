class Api::ResourcesController < ApplicationController
  before_action :resource!

  def create
    @resource = @resource_klass.new(resource_params)
    if @resource.save
      render json: @resource, status: :created
    else
      render json: @resource.errors, status: :unprocessable_entity
    end
  end

  private
  def resource_params
    params.require(params[:resource_type].to_sym)
      .permit(@resource_klass.creation_attributes)
  end

  def resource!
    @resource_klass = params[:resource_type].camelcase.constantize
  end
end
