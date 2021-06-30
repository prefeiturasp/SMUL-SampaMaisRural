module Api::SiteHelper
  def site_url resource
    "#{Rails.configuration.action_controller.asset_host}/lugar/#{resource&.slug}"
  end
end
