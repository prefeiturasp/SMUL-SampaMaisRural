class IntegrationJob < ApplicationJob
  queue_as :default

  def perform(etl_filename)
    Etl::Integration.new(etl_filename).run
  end
end
