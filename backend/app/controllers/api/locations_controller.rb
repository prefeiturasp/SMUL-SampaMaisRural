class Api::LocationsController < ApplicationController
  include Searchable

  def index
    @partners = Partner.search!(
      search_params[:term] || '*',
      where: filter_params)
      .map { |partner| PartnerPresenter.new(partner) }
      .group_by(&:type)
  end
end
