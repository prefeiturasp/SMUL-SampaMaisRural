class FixFiltersLabels < ActiveRecord::Migration[6.0]
  def change
    FilterGroup.all.each do |group|
      group.filters.each do |filter|
        filter.label = filter.label.capitalize
        filter.save
      end
    end
  end
end
