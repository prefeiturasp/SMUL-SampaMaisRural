module PartnerAdmin

  def initialize_entity_record

    action_item :seal, only: :show, if: proc { resource.download_seal? } do
      link_to(I18n.t('active_admin.download_seal'), as_zip_admin_seal_path(resource.seal.id))
    end

    batch_action :seals do |ids|
      respond_to do |format|
        format.html {
          send_file Seal.as_zip_for(batch_action_collection
            .joins(:subcategories)
            .where(id: ids, subcategories: { is_public: true })),
          filename: "selos.zip"
        }
      end
    end

    controller do
      include PartnersHelper

      def new
        build_resource
        category = Category.find_or_initialize_by(name: Dictionary.translate(resource.type))
        resource.category = category
        new!
      end

      def create
        super do |success, failure|
          success.html { redirect_to admin_partner_url(resource) }
          failure.html { render :new }
        end
      end

      def edit
        edit!
      end

      def update_resource object, attributes
        super PartnerForm.new(object), attributes
      end

      def update
        super do |success, failure|
          success.html { redirect_to  admin_partner_url(resource) }
          failure.html { render :edit }
        end
      end

      private

      def admin_partner_url resource
        "/admin/#{partner_url(resource)}/#{resource.id}"
      end
    end
  end
end
