ActiveAdmin.register PaperTrail::Version do
  actions :index
  menu parent: I18n.t("active_admin.management"),
    priority: 13,
    url: "/admin/#{I18n.t('routes.paper_trail_versions')}"

  controller do
    def scoped_collection
      PaperTrail::Version.where.not(whodunnit: nil).where(item_type: "Partner")
    end
  end

  index do
    column (:item) { |version| link_to(version.item.name, url_for([:admin, version.item])) }
    column (:created_at) { |version| version.created_at.to_s :long }
    column (:whodunnit) { |version| User.find_by_id(version.whodunnit)&.name }
    column (:event) { |version| I18n.t('events')[version.event.to_sym] }
    column (:changed_fields) { |version| History::VersionParser.new(version.changeset).changed_fields.map { |field| Partner.human_attribute_name(field) }  }
  end

  filter :created_at
  #filter :whodunnit, as: :select, collection: User.all.map { |user| [user.name, user.id] }
end
