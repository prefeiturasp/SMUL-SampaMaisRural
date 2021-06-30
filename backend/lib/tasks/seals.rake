namespace :seals do
  desc "generate seals taks"

  task setup: :environment do
    logger = Logger.new("log/prepare-deploy-#{Date.today}.log")
    logger.info("===== START GENERATING SEALS ====")
		Partner.find_each do |partner|
     			next unless partner.generate_seal?
			logger.info("generating for partner #{partner.id}")
			partner.generate_seal
			partner.save
		end
    logger.info("===== END GENERATING SEALS ====")
  end
end
