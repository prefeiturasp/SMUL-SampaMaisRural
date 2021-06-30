class Api::PartnersController < ApplicationController
  respond_to :json
  include Searchable

  def index
    results = Partner
      .search!((search_params[:term] || '*'),
               where: filter_params,
               page: params[:page],
               boost_by_distance: ordering_params,
               per_page: 15)
    @total_count = results.total_count
    @total_pages = results.total_pages
    @current_page = results.current_page
    @partners = results.map { |partner| PartnerPresenter.new(partner) }
  end

  def create
    @resource_klass = params[:resource_type].camelcase.constantize
    @resource = @resource_klass.new(resource_params.merge(source: :api))
    # NOTE Upa#birthdate= overrides method
    @resource.birthdate = resource_params[:birthdate] if resource_params[:birthdate]
    category_name = translate_category[params[:resource_type].to_sym]
    category = Category.where("lower(name) = ?", category_name.downcase).first_or_create(name: category_name)

    # TODO move to a class
    @resource.category = category
    @resource.source_info = "Informado por colaboração na Sampa+Rural"
    @resource.source_date = Date.today.strftime('%d/%m/%Y')
    if @resource.save
      notify_creation
      render json: @resource, status: :created
    else
      render json: @resource.errors, status: :unprocessable_entity
    end
  end

  def show
    partner = Partner.approved.friendly.find(params[:slug]).to_api
    @partner = PartnerPresenter.new(partner)
  end

  private
  def ordering_params
    { location: { origin: { lat: params[:center_lat], lon: params[:center_lon] }}}
  end

  def resource_params
    params.require(params[:resource_type].to_sym)
      .permit(@resource_klass.creation_attributes)
  end

  def notify_creation
    emails = User.with_role(@resource_klass.to_s.downcase).pluck(:email)
    emails.each do |email|
      AdminMailer.partner_created(@resource, email).deliver_later
    end
  end

  def translate_category
    { tourism: "Turismo e Vivência Rural",
      initiative: "Iniciativas",
      upa: "Agricultura",
      market: "Mercados" }
  end
end
