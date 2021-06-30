load 'db/migrate/20201015235132_add_attachments_to_subcategories.rb'
load 'db/migrate/20210113215045_addproduct_list_and_where_find_list_to_subcategories.rb'

namespace :subcategories do
  desc "subcategories tasks"

  task add_attachments: :environment do
    logger = Logger.new("log/prepare-deploy-#{Date.today}.log")
    logger.info("===== START ADD DEFAULT ATTACHMENTS TO SUBCATEGORIES ====")
    AddAttachmentsToSubcategories.new.change
    logger.info("===== END ADD DEFAULT ATTACHMENTS TO SUBCATEGORIES ====")
  end

  task setup_address_publication: :environment do
    Subcategory.where(name: ["Aldeias Guarani", "Agricultores sem contato"]).update_all(address_publication: :only_resume_address)
    Subcategory.where(name: "Agricultores com contato").update_all(address_publication: :full_address_only_on_show)
  end

  task update_sampa_partners_name: :environment do
		Subcategory.find_by(name: "Parceiro da Produção Local").try(:update, {name: "Parceiro da produção de Sampa"})
		ActsAsTaggableOn::Tag.where(name: "Parceiro da Produção Local").update_all(name: "Parceiro da produção de Sampa")
  end

  task setup_publication: :environment do
    without_contact = "Agricultores sem contato"
    Subcategory.where(name: without_contact).update_all(is_public: false)
    Subcategory.where.not(name: without_contact).update_all(is_public: true)
  end

  task setup_farmers_tags: :environment do
    AddproductListAndWhereFindListToSubcategories.new.change
  end

  task with_contact_should_not_update_via_integration: :environment do
    farmers = Subcategory.find_by(name: "Agricultores com contato").partners.pluck(:id)
    Partner.where.not(id: farmers).update_all(update_via_integration: true)
  end
end
