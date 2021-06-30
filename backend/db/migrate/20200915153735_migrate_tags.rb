class MigrateTags < ActiveRecord::Migration[6.0]
  def change
    %w[where_find qualification certificate].each do |tag_context|
      ActsAsTaggableOn::Tagging.where(context: tag_context).update_all(context: tag_context.pluralize)
    end
  end
end
