load 'db/migrate/20201019213118_move_api_partners_to_categories.rb'
load 'db/migrate/20201111201057_fix_subcategories.rb'
load 'db/migrate/20200915162300_add_tags_to_subcategories.rb'
load 'db/migrate/20200916144155_add_default_tags_to_subcatagories.rb'
load 'db/migrate/20201109204015_add_seals_to_categories.rb'

namespace :categories do
  desc "categories taks"

  task migrate: :environment do
    logger = Logger.new("log/prepare-deploy-#{Date.today}.log")
    logger.info("===== START MIGRATING CATEGORIES ====")
    logger.info("start move partners to categories")
    MoveApiPartnersToCategories.new.change
    logger.info("end move partners to categories")
    logger.info("start move subcategories")
    FixSubcategories.new.change
    logger.info("end move subcategories")
    logger.info("start add tags to subcategories")
    AddTagsToSubcategories.new.change
    logger.info("end add tags to subcategories")
    logger.info("start add default tags to subcategories")
    AddDefaultTagsToSubcatagories.new.change
    logger.info("end add default tags to subcategories")
    logger.info("===== END MIGRATING CATEGORIES ====")
  end

  task generate_seals: :environment do
    Category.find_each do |category|
      file = File.open("public/seals/seal-#{category.name.parameterize}.png")
      category.create_seal(file: file)
    end
  end
end
