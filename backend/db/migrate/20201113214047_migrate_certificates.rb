class MigrateCertificates < ActiveRecord::Migration[6.0]
  def change
    taggings = ActsAsTaggableOn::Tagging.where(context: 'certificates', taggable_type: 'Partner')
    taggings.each do |tagging|
      taggable = tagging.taggable
      taggable.certificate_list = tagging.tag.name
      taggable.save
    end
  end
end
