json.total @filter_groups.map {|x| x.count }.sum
json.categories @filter_groups do |group|
  json.name group.name
  json.label group.label
  json.count group.count
  json.filters group.filters.compact do |filter|
    json.label filter.label
    json.field filter.field
    json.values filter.values
  end
end

