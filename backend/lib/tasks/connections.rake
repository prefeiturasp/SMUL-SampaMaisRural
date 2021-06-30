load 'db/migrate/20200930010039_migrate_related_partners.rb'

namespace :connections do
  desc "connections taks"

  task migrate: :environment do
    logger = Logger.new("log/prepare-deploy-#{Date.today}.log")
    logger.info("===== START MIGRATING CONNECTIONS ====")
    MigrateRelatedPartners.new.change
    logger.info("===== END MIGRATING CONNECTIONS ====")
  end
end
