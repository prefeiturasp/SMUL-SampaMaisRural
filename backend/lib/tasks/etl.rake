require './lib/etl/integration.rb'

namespace :etl do
  desc "ETL tasks to import data"

  task import_partners: :environment do
    etl_filename = 'lib/etl/partners.etl'
    script_content = IO.read(etl_filename)
    job_definition = Kiba.parse(script_content, etl_filename)
    Kiba.run(job_definition)
  end

  task new_integration: :environment do
    Etl::Integration.new('lib/etl/integrations.etl').run
  end
end
