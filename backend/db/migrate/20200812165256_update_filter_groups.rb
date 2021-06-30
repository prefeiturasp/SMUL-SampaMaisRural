class UpdateFilterGroups < ActiveRecord::Migration[6.0]
  def change
    FilterGroup.destroy_all
    Partner.find_each do |partner|
      CreateFilterGroupService.new(partner).create_groups
    end
  end
end
