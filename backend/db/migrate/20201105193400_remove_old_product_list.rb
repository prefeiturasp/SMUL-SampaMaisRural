class RemoveOldProductList < ActiveRecord::Migration[6.0]
  def change
     ActsAsTaggableOn::Tag.all.select {|t| t.name.to_i.to_s == t.name}.map(&:destroy)
     ActsAsTaggableOn::Tag.all.select {|t| t.name.split(',').count > 1}.map(&:destroy)
  end
end
