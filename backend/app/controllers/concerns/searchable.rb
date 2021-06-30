module Searchable
  extend ActiveSupport::Concern

  def filter_params
    query_params = SearchBuilder.new(filters_permitted_params).query_params
    params[:type] ? query_params.merge!(type: params[:type]) : query_params
    params[:slug] ? query_params.merge!(slug: params[:slug]) : query_params
    params[:public] ? query_params.merge!(public: params[:public]) : query_params
    params[:connected_subcategories] ? query_params.merge!(connected_subcategories: params[:connected_subcategories]) : query_params
  end

  def search_params
    params.permit(:term)
  end

  private
  def filters_permitted_params
    params.permit([
      :covid,
      :has_related_partners,
      type: [],
      slug: [],
      connected_subcategories: [],
      filters: filterable_attributes,
    ])
  end

  def filterable_attributes
    Partner.partner_klasses_names
      .map {|n| {n => n.camelcase.constantize.searchable_params } }
  end
end
