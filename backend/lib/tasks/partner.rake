require './lib/etl/market_api_client.rb'

namespace :partner do
  desc "partners tasks"

  task :reset_idec => :environment do
    logger = Logger.new("log/prepare-deploy-#{Date.today}.log")
    logger.info("===== START RESET IDEC====")
    idec_ids = Market.idec.pluck(:id)
    PaperTrail::Version.where(item_id: idec_ids, item_type: 'Market').destroy_all
    Suggestion.where(suggestable_type: "Market", suggestable_id: idec_ids)
    Market.idec.destroy_all
    logger.info("===== END RESET IDEC====")
  end

  task :reset_partners => :environment do
    FilterGroup.destroy_all
    Partner.destroy_all
    ActsAsTaggableOn::Tag.destroy_all
  end

  task :reset_idec_source_dates => :environment do
    Market.idec.update_all(source_date: nil)
  end

  task :reset_sisrural_partners => :environment do
    Upa.where(source: :upa).
    joins(:subcategories).
    where(subcategories: { name: I18n.t('subcategories')[:farmers_without_contact] } ).destroy_all
    Partner.reindex
  end

  task :reset_update_via_integration => :environment do
    Partner.where.not(source: %w[idec geosampa upa]).update_all(update_via_integration: false)
  end

  task :import_idec_attachments => :environment do
    logger = Logger.new('log/new_idec_attachments.log')
    @markets = MarketApiClient.new.get_markets
    @markets.each do |market_data|
      market = Market.find_by api_id: market_data['id']
      next unless market
      market.attachments.destroy_all
      market.remote_avatar_url = market_data['avatar']
      images = MarketApiClient.new.get_images(market.api_id)
      images.each_with_index do |image, i|
        file = image['media_details']['file']
        remote_url = Rails.application.secrets.idec_uploads_url + file.to_s
        next if file.nil? || remote_url == market_data['avatar']
        market.attachments.build(remote_file_url: remote_url, origin: Attachment.origins[:api])
      end
      begin
        market.save!
        logger.info("[OK] file #{ file } imported for file #{ market.name } with api_id #{ market.api_id }")
      rescue => e
        logger.error("[ERROR] importing #{ file } for #{ market.name } with api_id: #{ market.api_id }")
        logger.info("[ERROR] message: #{ e.message }")
        logger.info("[ERROR] partners errors -> #{ market.errors.messages.inspect }")
      end
    end
    Partner.search_index.clean_indices
    Partner.reindex
  end

  task :import_attachments, [:file_path] => :environment do |task, args|
    logger = Logger.new('log/new_attachments.log')
    if ENV['RESET_PHOTOS']
      logger.info("[NEW ATTACHMENTS LOG]----- reset attachments -----")
      Attachment.where(attachmentable_id: Partner.not_idec.not_geosampa.pluck(:id)).destroy_all
    end
    dir = ENV['DIR']
    Dir[dir + '/*'].each do |folder|
      api_id = folder.split('/').last.split('-').last
      partner = Partner.not_idec.not_geosampa.find_by api_id: api_id
      case partner
      when nil
        logger.info("[NEW ATTACHMENTS LOG] Partner with api_id (#{ api_id }) not found")
      else
        logger.info("[NEW ATTACHMENTS LOG] importing name: #{ partner.name }, api_id: #{ partner.name }")
        Dir[folder + '/*'].each do |filename|
          File.open(filename) do |file|
            logger.info("importing #{ filename }")
            if filename.include?('avatar')
              partner.avatar = file
            else
              partner.attachments.build(file: file)
            end
            begin
              partner.save!
              logger.info("[OK] file #{ filename } imported for file #{ partner.name } with api_id #{ partner.api_id }")
            rescue => e
              logger.error("[ERROR] importing #{ filename } for #{ partner.name } with api_id: #{ partner.api_id }")
              logger.info("[ERROR] message: #{ e.message }")
              logger.info("[ERROR] partners errors -> #{ partner.errors.messages.inspect }")
            end
          end
        end
      end
    end
    Partner.search_index.clean_indices
    Partner.reindex
  end
end
