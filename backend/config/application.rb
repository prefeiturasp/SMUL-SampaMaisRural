require_relative 'boot'

require "rails/all"
# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SpRuralApi
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*', headers: :any, methods: [:get]
      end
    end

    config.i18n.default_locale = :'pt-BR'
    config.time_zone = 'Brasilia'
    config.i18n.load_path += Dir["#{Rails.root.to_s}/config/locales/**/*.{rb,yml}"]

    config.action_mailer.asset_host = ENV['APP_HOST']

    # Don't generate system test files.
    config.generators.system_tests = nil
  end
end
