load 'db/migrate/20200915153735_migrate_tags.rb'
load 'db/migrate/20201014155941_tags_to_qualifications.rb'

namespace :tags do
  desc "migrates to new tags"

  task :migrate => :environment do
    logger = Logger.new("log/prepare-deploy-#{Date.today}.log")
    logger.info("===== START MIGRATING TAGS ====")
    MigrateTags.new.change
    TagsToQualifications.new.change
    logger.info("===== END MIGRATING TAGS ====")
  end
end
