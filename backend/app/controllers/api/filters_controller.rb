class Api::FiltersController < ApplicationController
  include Searchable

  def index
    # TODO  remove permit!
    @filter_groups = SearchBuilder.
      new(params.permit!).filters(search_params[:params])
  end
end
