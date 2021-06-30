Rails.application.routes.draw do
  devise_for :users, ActiveAdmin::Devise.config
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    get 'locations/:type', to: 'locations#index'
    get 'locations', to: 'locations#index'
    resources :related_partners, only: :index

    get 'partners/:slug', to: 'partners#show'
    resources :partners, only: [:index, :create]
    resources :themes, only: [:index]
    get 'posts', to: 'posts#index'
    get 'themes/:name/posts', to: 'posts#index'

    post 'resources/:resource_type', to: 'resources#create'
    post 'partners/:resource_type', to: 'partners#create'

    get 'report', to: 'data#file'
    get 'report/:source', to: 'data#file'

    resources :data_reports, only: [:index, :show]

    get 'data', to: 'data#index'
    get 'covid',  to: 'data#covid'
    get 'all_data/:type', to: 'data#all'
    get 'data/:source', to: 'data#index'

    get 'regions/:region', to: 'data#regions'

    get 'partners/:partner_id/comments', to: 'comments#index'

    get 'filters', to: 'filters#index'
  end

  get 'admin/search_partners', to: "admin#searchable_partners"
  get 'admin/partners/:type', to: "admin/partners#index", as: :admin_partners
  get 'admin/partners/:partner_id/connections', to: "admin/partners#connections"
  ActiveAdmin.routes(self)

  localized do
    namespace :admin do
      resources :upas
      resources :agricultures
      resources :markets
      resources :integrated_markets
      resources :rural_experiences
      resources :tourisms
      resources :initiatives

      resources :filter_groups
      resources :messages
      resources :users
      resources :paper_trail_versions
      resources :suggestions
      resources :partner_comments
      resources :post_themes
      resources :subcategories
    end
  end
end
