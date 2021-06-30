class Api::RelatedPartnersController < ApplicationController
  include Searchable

  def index
    @partners = Partner
      .search((search_params[:term] || '*'),
              fields: Partner.searchable_attributes,
              match: :word_start,
              where: filter_params.merge!(has_related_partners: true),
              load: false)
  end
end
